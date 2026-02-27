<?php

namespace App\Services;

use App\Models\PageBuilderPage;
use App\Models\PageBuilderVersion;
use App\Models\User;
use App\Resources\PageBuilderPageResource;
use App\Resources\PageBuilderVersionResource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PageBuilderPageService
{
    private const GENERATED_PAGES_DIR = 'nuxt/pages/[lang]';

    public function __construct(
        private readonly PageBuilderPage $pageModel,
        private readonly PageBuilderVersion $versionModel
    ) {}

    public function index(User $user): Collection
    {
        return $this->pageQueryForUser($user)
            ->with('publishedVersion')
            ->orderByDesc('updated_at')
            ->get();
    }

    public function show(User $user, int $id): PageBuilderPage
    {
        return $this->pageQueryForUser($user)
            ->with([
                'publishedVersion',
                'versions' => fn ($query) => $query->orderByDesc('version'),
            ])
            ->findOrFail($id);
    }

    public function create(User $user, array $data): PageBuilderPageResource
    {
        $slug = $this->generateUniqueSlug($data['slug'] ?? $data['title']);

        $page = $this->pageModel::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'slug' => $slug,
            'status' => 'draft',
            'meta_json' => $data['meta_json'] ?? null,
        ]);

        $version = $this->createVersion($page, $user->id, $this->defaultLayout());

        return new PageBuilderPageResource(
            $page->fresh()->load('publishedVersion')->setRelation('versions', collect([$version]))
        );
    }

    public function update(User $user, int $id, array $data): PageBuilderPageResource
    {
        $page = $this->getOwnedPage($user, $id);
        $oldSlug = $page->slug;

        $nextSlug = $data['slug'] === $page->slug
            ? $page->slug
            : $this->generateUniqueSlug($data['slug'], $page->id);

        $page->update([
            'title' => $data['title'],
            'slug' => $nextSlug,
            'status' => $data['status'] ?? $page->status,
            'meta_json' => $data['meta_json'] ?? $page->meta_json,
        ]);

        // If slug changed and page is published, rename the generated file.
        if ($oldSlug !== $nextSlug && $page->status === 'published') {
            $this->removePageFile($oldSlug);

            $version = $page->publishedVersion;
            if ($version) {
                $this->generatePageFile($nextSlug, $version->layout_json);
            }
        }

        return new PageBuilderPageResource($page->fresh()->load('publishedVersion'));
    }

    public function delete(User $user, int $id): void
    {
        $page = $this->getOwnedPage($user, $id);
        $this->removePageFile($page->slug);
        $page->delete();
    }

    public function saveDraft(User $user, int $id, array $layout): PageBuilderVersionResource
    {
        $page = $this->getOwnedPage($user, $id);
        $version = $this->createVersion($page, $user->id, $layout);

        return new PageBuilderVersionResource($version);
    }

    public function publish(User $user, int $id, ?int $versionId = null): PageBuilderPageResource
    {
        $page = $this->getOwnedPage($user, $id);

        $version = $versionId
            ? $this->getPageVersion($page->id, $versionId)
            : $this->versionModel::where('page_id', $page->id)
                ->orderByDesc('version')
                ->firstOrFail();

        DB::transaction(function () use ($page, $version): void {
            $this->versionModel::where('page_id', $page->id)->update(['is_published' => false]);
            $version->update(['is_published' => true]);

            $page->update([
                'status' => 'published',
                'published_version_id' => $version->id,
            ]);
        });

        $this->generatePageFile($page->slug, $version->layout_json);

        return new PageBuilderPageResource($page->fresh()->load('publishedVersion'));
    }

    public function restore(User $user, int $id, int $version): PageBuilderVersionResource
    {
        $page = $this->getOwnedPage($user, $id);
        $sourceVersion = $this->versionModel::where('page_id', $page->id)
            ->where('version', $version)
            ->firstOrFail();

        $newVersion = $this->createVersion($page, $user->id, $sourceVersion->layout_json);

        return new PageBuilderVersionResource($newVersion);
    }

    public function versions(User $user, int $id): Collection
    {
        $page = $this->getOwnedPage($user, $id);

        return $this->versionModel::where('page_id', $page->id)
            ->orderByDesc('version')
            ->get();
    }

    public function renderBySlug(string $slug): array
    {
        $page = $this->pageModel::where('slug', $slug)
            ->where('status', 'published')
            ->with('publishedVersion')
            ->firstOrFail();

        $version = $page->publishedVersion
            ?? $this->versionModel::where('page_id', $page->id)
                ->orderByDesc('version')
                ->first();

        if (!$version) {
            abort(404, 'Published version not found.');
        }

        return [
            'page' => new PageBuilderPageResource($page),
            'layout_json' => $version->layout_json,
            'version' => $version->version,
        ];
    }

    public function prerenderRoutes(array $locales): array
    {
        $slugs = $this->pageModel::where('status', 'published')
            ->pluck('slug')
            ->toArray();

        $routes = [];
        foreach ($locales as $locale) {
            foreach ($slugs as $slug) {
                $routes[] = '/' . $locale . '/' . $slug;
            }
        }

        return array_values(array_unique($routes));
    }

    private function createVersion(PageBuilderPage $page, int $createdBy, array $layout): PageBuilderVersion
    {
        $nextVersion = ((int) $this->versionModel::where('page_id', $page->id)->max('version')) + 1;

        return $this->versionModel::create([
            'page_id' => $page->id,
            'version' => $nextVersion,
            'layout_json' => $layout,
            'checksum' => hash('sha256', json_encode($layout)),
            'is_published' => false,
            'created_by' => $createdBy,
        ]);
    }

    private function pageQueryForUser(User $user): Builder
    {
        $query = $this->pageModel::query();

        if ($user->isStaff()) {
            return $query;
        }

        return $query->where('user_id', $user->id);
    }

    private function getOwnedPage(User $user, int $id): PageBuilderPage
    {
        return $this->pageQueryForUser($user)->findOrFail($id);
    }

    private function getPageVersion(int $pageId, int $versionId): PageBuilderVersion
    {
        return $this->versionModel::where('page_id', $pageId)
            ->where('id', $versionId)
            ->firstOrFail();
    }

    private function generateUniqueSlug(string $rawSlug, ?int $ignorePageId = null): string
    {
        $baseSlug = Str::slug($rawSlug);
        $baseSlug = $baseSlug ?: Str::random(8);
        $slug = $baseSlug;
        $index = 2;

        while ($this->slugExists($slug, $ignorePageId)) {
            $slug = $baseSlug . '-' . $index;
            $index++;
        }

        return $slug;
    }

    private function slugExists(string $slug, ?int $ignorePageId = null): bool
    {
        $query = $this->pageModel::where('slug', $slug);
        if ($ignorePageId) {
            $query->where('id', '!=', $ignorePageId);
        }

        return $query->exists();
    }

    private function defaultLayout(): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'page',
            'settings' => [
                'maxWidth' => '1140px',
            ],
            'children' => [],
        ];
    }

    /**
     * Generate a static .vue page file with actual component markup (no JSON).
     */
    private function generatePageFile(string $slug, array $layoutJson): void
    {
        $dir = base_path(self::GENERATED_PAGES_DIR);

        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        $filePath = $dir . '/' . $slug . '.vue';
        $templateBody = $this->layoutToTemplate($layoutJson);

        $settings = $layoutJson['settings'] ?? [];

        // Build page wrapper style from settings
        $wrapperStyles = [];
        if (!empty($settings['maxWidth'])) {
            $wrapperStyles[] = 'max-width:' . e($settings['maxWidth']);
            $wrapperStyles[] = 'margin:0 auto';
        }
        if (!empty($settings['pagePadding'])) {
            $wrapperStyles[] = 'padding:' . e($settings['pagePadding']);
        }
        $wrapperStyleAttr = $wrapperStyles ? ' style="' . implode(';', $wrapperStyles) . '"' : '';

        // bgColor goes to <body> via useHead
        $bgColor = trim($settings['bgColor'] ?? '');

        $vue = "<template>\n  <div id=\"page-builder-public\"{$wrapperStyleAttr}>\n{$templateBody}  </div>\n</template>\n\n";

        // Build script section with useHead for SEO meta
        $metaTitle = trim($settings['metaTitle'] ?? '');
        $metaDescription = trim($settings['metaDescription'] ?? '');
        $ogImage = trim($settings['ogImage'] ?? '');

        $headParts = [];
        if ($metaTitle !== '') {
            $headParts[] = '  title: ' . json_encode($metaTitle, JSON_UNESCAPED_UNICODE) . ',';
        }
        if ($metaDescription !== '' || $ogImage !== '') {
            $metaItems = [];
            if ($metaDescription !== '') {
                $metaItems[] = "    { name: 'description', content: " . json_encode($metaDescription, JSON_UNESCAPED_UNICODE) . ' }';
                $metaItems[] = "    { property: 'og:description', content: " . json_encode($metaDescription, JSON_UNESCAPED_UNICODE) . ' }';
            }
            if ($ogImage !== '') {
                $metaItems[] = "    { property: 'og:image', content: " . json_encode($ogImage, JSON_UNESCAPED_UNICODE) . ' }';
            }
            $headParts[] = "  meta: [\n" . implode(",\n", $metaItems) . "\n  ],";
        }

        if ($bgColor !== '') {
            $headParts[] = "  bodyAttrs: {\n    style: " . json_encode("background:{$bgColor}", JSON_UNESCAPED_UNICODE) . ",\n  },";
        }

        if (!empty($headParts)) {
            $headBody = implode("\n", $headParts);
            $vue .= "<script setup lang=\"ts\">\n// Auto-generated by Page Builder – do not edit manually.\nuseHead({\n{$headBody}\n})\n</script>\n";
        } else {
            $vue .= "<script setup lang=\"ts\">\n// Auto-generated by Page Builder – do not edit manually.\n</script>\n";
        }

        // Append custom page styles if defined
        $customStyles = trim($settings['customStyles'] ?? '');

        if ($customStyles !== '') {
            $styleLang = ($settings['styleLang'] ?? 'css') === 'scss' ? 'scss' : 'css';
            $langAttr = $styleLang === 'scss' ? ' lang="scss"' : '';
            $vue .= "\n<style{$langAttr}>\n{$customStyles}\n</style>\n";
        }

        File::put($filePath, $vue);
    }

    /**
     * Convert layout JSON tree into Vue template markup.
     */
    private function layoutToTemplate(array $layout, int $depth = 2): array|string
    {
        $indent = str_repeat('  ', $depth);
        $lines = [];

        $children = $layout['children'] ?? [];
        foreach ($children as $node) {
            $widgetType = $node['widgetType'] ?? 'text';
            $props = $node['props'] ?? [];
            $styles = $node['styles'] ?? [];
            $styleAttr = $this->buildStyleAttr($styles);

            switch ($widgetType) {
                case 'component':
                    $tag = $props['componentTag'] ?? 'div';
                    $componentProps = $props['componentProps'] ?? [];
                    $attrs = $this->buildComponentAttrs($componentProps);
                    $attrStr = $attrs ? ' ' . $attrs : '';
                    $lines[] = "{$indent}<{$tag}{$attrStr}{$styleAttr} />";
                    break;

                case 'heading':
                    $level = $props['level'] ?? 'h2';
                    if (!in_array($level, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])) {
                        $level = 'h2';
                    }
                    $text = e($props['text'] ?? '');
                    $lines[] = "{$indent}<{$level}{$styleAttr}>{$text}</{$level}>";
                    break;

                case 'button':
                    $text = e($props['text'] ?? '');
                    $href = e($props['href'] ?? '#');
                    $lines[] = "{$indent}<a href=\"{$href}\"{$styleAttr}>{$text}</a>";
                    break;

                case 'image':
                    $src = e($props['src'] ?? '');
                    $alt = e($props['alt'] ?? '');
                    $width = e($props['width'] ?? '');
                    $widthStyle = $width ? " style=\"max-width:{$width}\"" : '';
                    $lines[] = "{$indent}<img src=\"{$src}\" alt=\"{$alt}\"{$widthStyle}{$styleAttr} />";
                    break;

                case 'video':
                    $src = e($props['src'] ?? '');
                    $w = e($props['width'] ?? '100%');
                    $h = e($props['height'] ?? '400');
                    $lines[] = "{$indent}<iframe src=\"{$src}\" width=\"{$w}\" height=\"{$h}\" frameborder=\"0\" allowfullscreen{$styleAttr} />";
                    break;

                case 'divider':
                    $lines[] = "{$indent}<hr{$styleAttr} />";
                    break;

                case 'spacer':
                    $height = e($props['height'] ?? '40px');
                    $lines[] = "{$indent}<div style=\"height:{$height}\"{$styleAttr} />";
                    break;

                case 'html':
                    $html = $props['html'] ?? '';
                    $lines[] = "{$indent}<div>{$html}</div>";
                    break;

                case 'list':
                    $raw = $props['items'] ?? '';
                    $ordered = !empty($props['ordered']);
                    $tag = $ordered ? 'ol' : 'ul';
                    $items = array_filter(explode("\n", $raw), fn ($l) => trim($l) !== '');
                    $itemsHtml = '';
                    foreach ($items as $item) {
                        $itemsHtml .= "\n{$indent}  <li>" . e(trim($item)) . '</li>';
                    }
                    $lines[] = "{$indent}<{$tag}{$styleAttr}>{$itemsHtml}\n{$indent}</{$tag}>";
                    break;

                case 'quote':
                    $text = e($props['text'] ?? '');
                    $cite = e($props['cite'] ?? '');
                    $citeHtml = $cite ? "\n{$indent}  <cite>— {$cite}</cite>" : '';
                    $lines[] = "{$indent}<blockquote{$styleAttr}>\n{$indent}  <p>{$text}</p>{$citeHtml}\n{$indent}</blockquote>";
                    break;

                case 'code':
                    $code = e($props['code'] ?? '');
                    $lang = e($props['language'] ?? '');
                    $classAttr = $lang ? " class=\"language-{$lang}\"" : '';
                    $lines[] = "{$indent}<pre{$styleAttr}><code{$classAttr}>{$code}</code></pre>";
                    break;

                default: // text
                    $text = e($props['text'] ?? '');
                    $lines[] = "{$indent}<p{$styleAttr}>{$text}</p>";
                    break;
            }
        }

        return implode("\n", $lines) . "\n";
    }

    /**
     * Build a style="" attribute string from a node's styles array/object.
     */
    private function buildStyleAttr(array|object $styles): string
    {
        if (is_object($styles)) {
            $styles = (array) $styles;
        }

        if (empty($styles)) {
            return '';
        }

        $parts = [];

        if (!empty($styles['padding'])) {
            $parts[] = 'padding: ' . e($styles['padding']);
        }

        if (!empty($styles['margin'])) {
            $parts[] = 'margin: ' . e($styles['margin']);
        }

        if (!empty($styles['background'])) {
            $parts[] = 'background: ' . e($styles['background']);
        }

        if (!empty($styles['color'])) {
            $parts[] = 'color: ' . e($styles['color']);
        }

        if (empty($parts)) {
            return '';
        }

        return ' style="' . implode('; ', $parts) . '"';
    }

    /**
     * Build HTML attribute string from component props.
     */
    private function buildComponentAttrs(array|object $componentProps): string
    {
        if (is_object($componentProps)) {
            $componentProps = (array) $componentProps;
        }

        if (empty($componentProps)) {
            return '';
        }

        $attrs = [];
        foreach ($componentProps as $key => $value) {
            if (is_string($value)) {
                $attrs[] = e($key) . '="' . e($value) . '"';
            } elseif (is_bool($value)) {
                if ($value) {
                    $attrs[] = e($key);
                }
            } elseif (is_numeric($value)) {
                $attrs[] = ':' . e($key) . '="' . $value . '"';
            } else {
                // Objects / arrays → Vue binding
                $encoded = e(json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
                $attrs[] = ':' . e($key) . "='" . $encoded . "'";
            }
        }

        return implode(' ', $attrs);
    }

    /**
     * Remove a previously generated .vue page file.
     */
    private function removePageFile(string $slug): void
    {
        $filePath = base_path(self::GENERATED_PAGES_DIR) . '/' . $slug . '.vue';

        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }
}
