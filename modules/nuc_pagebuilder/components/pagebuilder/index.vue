<template>
  <section class="pb-editor">
    <header class="pb-topbar pb-panel">
      <div class="pb-topbar-left">
        <input v-model="form.title" class="pb-input pb-input-title" placeholder="Page title" />
        <span class="pb-slug-prefix">/{{ lang }}/</span>
        <input v-model="form.slug" class="pb-input pb-input-slug" placeholder="slug" />
      </div>

      <div class="pb-topbar-center">
        <div class="pb-status" :class="`pb-status-${saveState}`">
          <span class="pb-status-dot" />
          {{ saveLabel }}
          <span v-if="lastSavedLabel" class="pb-status-time"> · {{ lastSavedLabel }}</span>
        </div>
      </div>

      <div class="pb-topbar-right">
        <button
          class="pb-btn pb-btn-sm"
          title="Undo (Ctrl+Z)"
          :disabled="!selectedPageId"
          @click="undo"
        >↩</button>
        <button
          class="pb-btn pb-btn-sm"
          title="Redo (Ctrl+Y)"
          :disabled="!selectedPageId"
          @click="redo"
        >↪</button>
        <span class="pb-topbar-sep" />
        <label class="pb-autosave-toggle" title="Autosave">
          <input type="checkbox" v-model="autosaveEnabled" />
          <span class="pb-autosave-label">Auto</span>
        </label>
        <span class="pb-topbar-sep" />
        <button
          class="pb-btn"
          :disabled="!selectedPageId || saveState === 'saving'"
          @click="saveDraft"
        >💾 Save</button>
        <button
          class="pb-btn pb-btn-primary"
          :disabled="!selectedPageId || saveState === 'saving'"
          @click="publishPage"
        >🚀 Publish</button>
        <a
          v-if="selectedPageSlug"
          class="pb-btn"
          :href="`/${lang}/${selectedPageSlug}`"
          target="_blank"
        >↗ Preview</a>
      </div>
    </header>

    <div class="pb-layout">
      <aside class="pb-sidebar pb-panel">
        <div class="pb-header-row">
          <h3>Pages</h3>
          <button class="pb-btn" @click="createPage">+ New</button>
        </div>
        <ul class="pb-pages-list">
          <li v-for="page in pages" :key="page.id">
            <div
              class="pb-page-item"
              :class="{ active: selectedPageId === page.id }"
              @click="loadPage(page.id)"
            >
              <span>{{ page.title }}</span>
              <div class="pb-page-item-right">
                <small>{{ page.status }}</small>
                <button
                  class="pb-page-delete"
                  title="Delete page"
                  @click.stop="confirmDeletePageId = page.id"
                >✕</button>
              </div>
            </div>
          </li>
        </ul>

        <div class="pb-header-row pb-widget-header">
          <h3>Widgets</h3>
          <span class="pb-chip">{{ filteredWidgets.length }}</span>
        </div>

        <div class="pb-widget-search-row">
          <div class="pb-search-icon">🔍</div>
          <input
            v-model="widgetSearch"
            class="pb-input pb-input-search"
            placeholder="Search widgets..."
          />
        </div>

        <div class="pb-source-tabs">
          <button
            v-for="source in widgetSources"
            :key="source"
            class="pb-source-tab"
            :class="{ active: activeWidgetSource === source }"
            @click="activeWidgetSource = source"
          >
            {{ source }}
          </button>
        </div>

        <div class="pb-widget-groups">
          <template v-for="group in groupedWidgets" :key="group.key">
            <button
              class="pb-group-header"
              :class="{ collapsed: collapsedGroups.has(group.key) }"
              @click="toggleGroup(group.key)"
            >
              <span class="pb-group-header-left">
                <span class="pb-group-icon">{{ group.icon }}</span>
                <span class="pb-group-label">{{ group.label }}</span>
              </span>
              <span class="pb-group-header-right">
                <span class="pb-chip pb-chip-sm">{{ group.widgets.length }}</span>
                <span class="pb-group-chevron">›</span>
              </span>
            </button>
            <div
              v-if="!collapsedGroups.has(group.key)"
              class="pb-widget-grid"
              :class="{ 'pb-widget-grid-2col': group.key === 'Native' }"
            >
              <button
                v-for="widget in group.widgets"
                :key="widget.key"
                draggable="true"
                class="pb-widget-card"
                :class="{ 'pb-widget-card-native': widget.source === 'native' }"
                :title="widget.label"
                @dragstart="onWidgetDragStart(widget.key)"
                @click="addWidget(widget.key)"
              >
                <span class="pb-widget-card-icon">{{ widgetIcon(widget) }}</span>
                <span class="pb-widget-card-label">{{ getWidgetShortLabel(widget) }}</span>
              </button>
            </div>
          </template>
          <p v-if="filteredWidgets.length === 0" class="pb-empty-small">
            No widgets found for this filter.
          </p>
        </div>
      </aside>

      <main
        class="pb-canvas-wrapper pb-panel"
        :style="layout.settings.bgColor ? { background: layout.settings.bgColor } : {}"
      >
        <div class="pb-hint">
          Drag or click widgets to add · Ctrl+S save · Ctrl+Z undo · Ctrl+Y redo
        </div>
        <div
          ref="canvasRef"
          class="pb-canvas"
          @dragover.prevent="onCanvasDragOver"
          @drop.prevent="onCanvasDrop"
          @dragleave="onCanvasDragLeave"
        >
          <div v-if="layout.children.length === 0" class="pb-empty">
            Empty page. Drop first widget.
          </div>
          <template v-for="(node, index) in layout.children" :key="node.id">
            <div
              class="pb-drop-indicator"
              :class="{ active: dropTargetIndex === index }"
            />
            <div
              class="pb-node"
              :class="{
                selected: selectedNodeId === node.id,
                dragging: draggedNodeId === node.id,
              }"
              :data-node-index="index"
              draggable="true"
              @dragstart="onNodeDragStart(node.id)"
              @dragend="onNodeDragEnd"
              @click="selectNode(node.id)"
            >
              <div class="pb-node-header">
                <span class="pb-node-title">{{ index + 1 }}. {{ widgetDisplayName(node) }}</span>
                <button
                  class="pb-node-delete"
                  type="button"
                  @click.stop="removeNode(node.id)"
                >✕</button>
              </div>

              <!-- Heading preview -->
              <component
                v-if="node.widgetType === 'heading'"
                :is="String(node.props.level ?? 'h2')"
                :style="node.styles"
                class="pb-inline-preview"
              >{{ node.props.text ?? '' }}</component>

              <!-- Text preview -->
              <p v-else-if="node.widgetType === 'text'" :style="node.styles" class="pb-inline-preview">
                {{ node.props.text ?? '' }}
              </p>

              <!-- Button preview -->
              <a
                v-else-if="node.widgetType === 'button'"
                :href="String(node.props.href ?? '#')"
                :style="node.styles"
                class="pb-inline-preview pb-btn-preview"
                @click.prevent
              >{{ node.props.text ?? '' }}</a>

              <!-- Image preview -->
              <img
                v-else-if="node.widgetType === 'image'"
                :src="String(node.props.src ?? '')"
                :alt="String(node.props.alt ?? '')"
                :style="{ maxWidth: String(node.props.width || '100%'), ...node.styles as any }"
                class="pb-inline-preview pb-image-preview"
              />

              <!-- Video preview -->
              <div v-else-if="node.widgetType === 'video'" class="pb-inline-preview pb-video-preview">
                <iframe
                  :src="String(node.props.src ?? '')"
                  :width="String(node.props.width ?? '100%')"
                  :height="String(node.props.height ?? '400')"
                  frameborder="0"
                  allowfullscreen
                  style="pointer-events:none;border-radius:8px;"
                />
              </div>

              <!-- Divider preview -->
              <hr v-else-if="node.widgetType === 'divider'" :style="node.styles" class="pb-inline-preview pb-divider-preview" />

              <!-- Spacer preview -->
              <div
                v-else-if="node.widgetType === 'spacer'"
                class="pb-inline-preview pb-spacer-preview"
                :style="{ height: String(node.props.height ?? '40px'), ...node.styles as any }"
              >
                <span class="pb-spacer-label">↕ {{ node.props.height ?? '40px' }}</span>
              </div>

              <!-- HTML preview -->
              <div
                v-else-if="node.widgetType === 'html'"
                class="pb-inline-preview pb-html-preview"
                v-html="String(node.props.html ?? '')"
              />

              <!-- List preview -->
              <component
                v-else-if="node.widgetType === 'list'"
                :is="node.props.ordered ? 'ol' : 'ul'"
                :style="node.styles"
                class="pb-inline-preview pb-list-preview"
              >
                <li v-for="(item, i) in listItems(node)" :key="i">{{ item }}</li>
              </component>

              <!-- Quote preview -->
              <blockquote
                v-else-if="node.widgetType === 'quote'"
                :style="node.styles"
                class="pb-inline-preview pb-quote-preview"
              >
                <p>{{ node.props.text ?? '' }}</p>
                <cite v-if="node.props.cite">— {{ node.props.cite }}</cite>
              </blockquote>

              <!-- Code preview -->
              <pre
                v-else-if="node.widgetType === 'code'"
                class="pb-inline-preview pb-code-preview"
              ><code>{{ node.props.code ?? '' }}</code></pre>

              <!-- Component preview -->
              <div v-else-if="node.widgetType === 'component'" class="pb-node-render">
                <component :is="resolvedComponentTag(node)" v-bind="componentProps(node)" />
              </div>

              <span v-else class="pb-node-text">{{ nodePreviewText(node) }}</span>
            </div>
          </template>
          <div
            class="pb-drop-indicator"
            :class="{ active: dropTargetIndex === layout.children.length }"
          />
        </div>
      </main>

      <aside class="pb-inspector pb-panel">
        <div class="pb-inspector-tabs">
          <button
            class="pb-inspector-tab"
            :class="{ active: inspectorTab === 'widget' }"
            @click="inspectorTab = 'widget'"
          >Widget</button>
          <button
            class="pb-inspector-tab"
            :class="{ active: inspectorTab === 'page' }"
            @click="inspectorTab = 'page'"
          >Page</button>
          <button
            class="pb-inspector-tab"
            :class="{ active: inspectorTab === 'styles' }"
            @click="inspectorTab = 'styles'"
          >Styles</button>
        </div>

        <!-- ═══ PAGE TAB ═══ -->
        <div v-if="inspectorTab === 'page'" class="pb-inspector-body">
          <h4 class="pb-inspector-section">SEO & Meta</h4>
          <label class="pb-label">
            Meta title
            <input
              class="pb-input"
              :value="String(layout.settings.metaTitle ?? '')"
              placeholder="Page title for search engines"
              @input="onSettingChange('metaTitle', ($event.target as HTMLInputElement).value)"
            />
          </label>
          <label class="pb-label">
            Meta description
            <textarea
              class="pb-textarea"
              :value="String(layout.settings.metaDescription ?? '')"
              placeholder="Short description for search engines"
              @input="onSettingChange('metaDescription', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>
          <label class="pb-label">
            OG image URL
            <input
              class="pb-input"
              :value="String(layout.settings.ogImage ?? '')"
              placeholder="https://example.com/image.jpg"
              @input="onSettingChange('ogImage', ($event.target as HTMLInputElement).value)"
            />
          </label>

          <h4 class="pb-inspector-section">Layout</h4>
          <label class="pb-label">
            Max width
            <input
              class="pb-input"
              :value="String(layout.settings.maxWidth ?? '1140px')"
              placeholder="e.g. 1140px, 100%"
              @input="onSettingChange('maxWidth', ($event.target as HTMLInputElement).value)"
            />
          </label>
          <label class="pb-label">
            Page padding
            <input
              class="pb-input"
              :value="String(layout.settings.pagePadding ?? '0')"
              placeholder="e.g. 48px 16px"
              @input="onSettingChange('pagePadding', ($event.target as HTMLInputElement).value)"
            />
          </label>
          <label class="pb-label">
            Background color
            <div class="pb-color-row">
              <input
                type="color"
                class="pb-color-input"
                :value="String(layout.settings.bgColor ?? '#000000')"
                @input="onSettingChange('bgColor', ($event.target as HTMLInputElement).value)"
              />
              <input
                class="pb-input"
                :value="String(layout.settings.bgColor ?? '')"
                placeholder="#000000"
                @input="onSettingChange('bgColor', ($event.target as HTMLInputElement).value)"
              />
            </div>
          </label>

          <h4 class="pb-inspector-section">Info</h4>
          <div class="pb-info-grid">
            <span>Sections</span>
            <span>{{ layout.children.length }}</span>
            <span>Status</span>
            <span>{{ selectedPageSlug ? 'saved' : 'new' }}</span>
            <span>Slug</span>
            <span>/{{ lang }}/{{ form.slug || '—' }}</span>
          </div>
        </div>

        <!-- ═══ WIDGET TAB ═══ -->
        <div v-else-if="inspectorTab === 'widget'" class="pb-inspector-body">
        <template v-if="selectedNode">
          <p class="pb-inspector-type">{{ selectedNode.widgetType }}</p>

          <!-- Text (heading, text, button, quote) -->
          <label v-if="hasTextProp" class="pb-label">
            Text
            <textarea
              class="pb-textarea"
              :value="String(selectedNode.props.text ?? '')"
              @input="onNodePropChange('text', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>

          <!-- Heading level -->
          <label v-if="selectedNode.widgetType === 'heading'" class="pb-label">
            Heading level
            <select
              class="pb-input"
              :value="String(selectedNode.props.level ?? 'h2')"
              @change="onNodePropChange('level', ($event.target as HTMLSelectElement).value)"
            >
              <option v-for="l in ['h1','h2','h3','h4','h5','h6']" :key="l" :value="l">{{ l }}</option>
            </select>
          </label>

          <!-- Button link -->
          <label v-if="selectedNode.widgetType === 'button'" class="pb-label">
            Button link
            <input
              class="pb-input"
              :value="String(selectedNode.props.href ?? '#')"
              @input="onNodePropChange('href', ($event.target as HTMLInputElement).value)"
            />
          </label>

          <!-- Image -->
          <template v-if="selectedNode.widgetType === 'image'">
            <label class="pb-label">
              Image URL
              <input
                class="pb-input"
                :value="String(selectedNode.props.src ?? '')"
                @input="onNodePropChange('src', ($event.target as HTMLInputElement).value)"
              />
            </label>
            <label class="pb-label">
              Alt text
              <input
                class="pb-input"
                :value="String(selectedNode.props.alt ?? '')"
                @input="onNodePropChange('alt', ($event.target as HTMLInputElement).value)"
              />
            </label>
            <label class="pb-label">
              Width (e.g. 300px, 100%)
              <input
                class="pb-input"
                :value="String(selectedNode.props.width ?? '')"
                @input="onNodePropChange('width', ($event.target as HTMLInputElement).value)"
              />
            </label>
          </template>

          <!-- Video -->
          <template v-if="selectedNode.widgetType === 'video'">
            <label class="pb-label">
              Embed URL
              <input
                class="pb-input"
                :value="String(selectedNode.props.src ?? '')"
                @input="onNodePropChange('src', ($event.target as HTMLInputElement).value)"
              />
            </label>
            <label class="pb-label">
              Width
              <input
                class="pb-input"
                :value="String(selectedNode.props.width ?? '100%')"
                @input="onNodePropChange('width', ($event.target as HTMLInputElement).value)"
              />
            </label>
            <label class="pb-label">
              Height
              <input
                class="pb-input"
                :value="String(selectedNode.props.height ?? '400')"
                @input="onNodePropChange('height', ($event.target as HTMLInputElement).value)"
              />
            </label>
          </template>

          <!-- Spacer -->
          <label v-if="selectedNode.widgetType === 'spacer'" class="pb-label">
            Height
            <input
              class="pb-input"
              :value="String(selectedNode.props.height ?? '40px')"
              @input="onNodePropChange('height', ($event.target as HTMLInputElement).value)"
            />
          </label>

          <!-- HTML -->
          <label v-if="selectedNode.widgetType === 'html'" class="pb-label">
            HTML code
            <textarea
              class="pb-textarea pb-textarea-code"
              :value="String(selectedNode.props.html ?? '')"
              @input="onNodePropChange('html', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>

          <!-- List -->
          <template v-if="selectedNode.widgetType === 'list'">
            <label class="pb-label">
              Items (one per line)
              <textarea
                class="pb-textarea"
                :value="String(selectedNode.props.items ?? '')"
                @input="onNodePropChange('items', ($event.target as HTMLTextAreaElement).value)"
              />
            </label>
            <label class="pb-label pb-label-inline">
              <input
                type="checkbox"
                :checked="!!selectedNode.props.ordered"
                @change="onNodePropChange('ordered', ($event.target as HTMLInputElement).checked)"
              />
              Ordered list (1, 2, 3…)
            </label>
          </template>

          <!-- Quote cite -->
          <label v-if="selectedNode.widgetType === 'quote'" class="pb-label">
            Citation
            <input
              class="pb-input"
              :value="String(selectedNode.props.cite ?? '')"
              @input="onNodePropChange('cite', ($event.target as HTMLInputElement).value)"
            />
          </label>

          <!-- Code -->
          <template v-if="selectedNode.widgetType === 'code'">
            <label class="pb-label">
              Code
              <textarea
                class="pb-textarea pb-textarea-code"
                :value="String(selectedNode.props.code ?? '')"
                @input="onNodePropChange('code', ($event.target as HTMLTextAreaElement).value)"
              />
            </label>
            <label class="pb-label">
              Language
              <input
                class="pb-input"
                :value="String(selectedNode.props.language ?? '')"
                @input="onNodePropChange('language', ($event.target as HTMLInputElement).value)"
              />
            </label>
          </template>

          <!-- Component -->
          <!-- Component: tag + schema-based props -->
          <template v-if="selectedNode.widgetType === 'component'">
            <label class="pb-label">
              Component tag
              <input
                class="pb-input"
                :value="String(selectedNode.props.componentTag ?? '')"
                @input="
                  onNodePropChange(
                    'componentTag',
                    ($event.target as HTMLInputElement).value
                  )
                "
              />
            </label>

            <!-- Schema-driven prop fields -->
            <template v-if="activeComponentSchema.length > 0">
              <h4 class="pb-inspector-section">Props</h4>
              <template v-for="field in activeComponentSchema" :key="field.key">
                <!-- String -->
                <label v-if="field.type === 'string'" class="pb-label">
                  {{ field.label }}
                  <input
                    class="pb-input"
                    :value="String(getComponentProp(field.key) ?? field.default ?? '')"
                    :placeholder="field.placeholder"
                    @input="setComponentProp(field.key, ($event.target as HTMLInputElement).value)"
                  />
                </label>

                <!-- Number -->
                <label v-else-if="field.type === 'number'" class="pb-label">
                  {{ field.label }}
                  <input
                    class="pb-input"
                    type="number"
                    :value="getComponentProp(field.key) ?? field.default ?? ''"
                    :placeholder="field.placeholder"
                    @input="setComponentProp(field.key, Number(($event.target as HTMLInputElement).value))"
                  />
                </label>

                <!-- Boolean -->
                <label v-else-if="field.type === 'boolean'" class="pb-label pb-label-inline">
                  <input
                    type="checkbox"
                    :checked="!!getComponentProp(field.key) || (getComponentProp(field.key) === undefined && !!field.default)"
                    @change="setComponentProp(field.key, ($event.target as HTMLInputElement).checked)"
                  />
                  {{ field.label }}
                </label>

                <!-- Select -->
                <label v-else-if="field.type === 'select'" class="pb-label">
                  {{ field.label }}
                  <select
                    class="pb-input"
                    :value="String(getComponentProp(field.key) ?? field.default ?? '')"
                    @change="setComponentProp(field.key, ($event.target as HTMLSelectElement).value)"
                  >
                    <option v-for="opt in field.options" :key="opt" :value="opt">
                      {{ opt || '(default)' }}
                    </option>
                  </select>
                </label>

                <!-- Color -->
                <label v-else-if="field.type === 'color'" class="pb-label">
                  {{ field.label }}
                  <div class="pb-color-row">
                    <input
                      type="color"
                      class="pb-color-input"
                      :value="String(getComponentProp(field.key) ?? field.default ?? '#000000')"
                      @input="setComponentProp(field.key, ($event.target as HTMLInputElement).value)"
                    />
                    <input
                      class="pb-input"
                      :value="String(getComponentProp(field.key) ?? '')"
                      :placeholder="field.placeholder"
                      @input="setComponentProp(field.key, ($event.target as HTMLInputElement).value)"
                    />
                  </div>
                </label>

                <!-- JSON (complex) -->
                <label v-else-if="field.type === 'json'" class="pb-label">
                  {{ field.label }}
                  <textarea
                    class="pb-textarea pb-textarea-code"
                    :value="jsonStringify(getComponentProp(field.key))"
                    :placeholder="field.placeholder"
                    @input="setComponentPropJson(field.key, ($event.target as HTMLTextAreaElement).value)"
                  />
                </label>
              </template>
            </template>

            <!-- Fallback: raw JSON if no schema -->
            <template v-else>
              <h4 class="pb-inspector-section">Props (JSON)</h4>
              <textarea
                class="pb-textarea pb-textarea-code"
                :value="componentPropsJson"
                @input="onComponentPropsJsonInput(($event.target as HTMLTextAreaElement).value)"
              />
              <p class="pb-styles-hint">No schema for this component. Edit raw JSON.</p>
            </template>
            <p v-if="componentJsonError" class="pb-error">{{ componentJsonError }}</p>
          </template>
        </template>
        <p v-else class="pb-empty-small">Select a widget on the canvas to edit its properties.</p>
        </div>

        <!-- ═══ STYLES TAB ═══ -->
        <div v-else-if="inspectorTab === 'styles'" class="pb-inspector-body">
          <div class="pb-styles-lang-toggle">
            <button
              class="pb-chip-btn"
              :class="{ active: pageStyleLang === 'css' }"
              @click="pageStyleLang = 'css'"
            >CSS</button>
            <button
              class="pb-chip-btn"
              :class="{ active: pageStyleLang === 'scss' }"
              @click="pageStyleLang = 'scss'"
            >SCSS</button>
          </div>
          <textarea
            class="pb-textarea pb-textarea-code pb-styles-editor"
            :value="pageCustomStyles"
            placeholder="/* Write custom CSS / SCSS for this page */&#10;#page-builder-public {&#10;  h2 { color: red; }&#10;}"
            @input="onCustomStylesInput(($event.target as HTMLTextAreaElement).value)"
          />
          <p class="pb-styles-hint">
            Styles are scoped to <code>#page-builder-public</code>.
            Output: <code>&lt;style{{ pageStyleLang === 'scss' ? ' lang="scss"' : '' }}&gt;</code>
          </p>
        </div>
      </aside>
    </div>
  </section>
  <component :is="'style'" v-if="pageCustomStyles">{{ pageCustomStyles }}</component>

  <!-- Delete confirmation dialog -->
  <Dialog
    :visible="!!confirmDeleteNodeId"
    :modal="true"
    :draggable="false"
    :closable="true"
    :dismissable-mask="true"
    class="pb-confirm-dialog"
    :pt="{
      pcCloseButton: { root: { 'ad-type': 'main' } },
    }"
    @update:visible="confirmDeleteNodeId = null"
  >
    <template #header>
      <span class="pb-confirm-title">Usunąć sekcję?</span>
    </template>

    <p class="pb-confirm-text">
      Czy na pewno chcesz usunąć <strong>{{ confirmDeleteNodeName }}</strong>?
    </p>

    <template #footer>
      <div class="pb-confirm-footer">
        <ad-button label="Anuluj" severity="secondary" outlined @click="confirmDeleteNodeId = null" />
        <ad-button label="Usuń" severity="danger" @click="confirmRemoveNode" />
      </div>
    </template>
  </Dialog>

  <!-- Delete page confirmation dialog -->
  <Dialog
    :visible="!!confirmDeletePageId"
    :modal="true"
    :draggable="false"
    :closable="true"
    :dismissable-mask="true"
    class="pb-confirm-dialog"
    :pt="{
      pcCloseButton: { root: { 'ad-type': 'main' } },
    }"
    @update:visible="confirmDeletePageId = null"
  >
    <template #header>
      <span class="pb-confirm-title">Delete page?</span>
    </template>

    <p class="pb-confirm-text">
      Are you sure you want to delete <strong>{{ confirmDeletePageName }}</strong>? This action cannot be undone.
    </p>

    <template #footer>
      <div class="pb-confirm-footer">
        <ad-button label="Cancel" severity="secondary" outlined @click="confirmDeletePageId = null" />
        <ad-button label="Delete" severity="danger" @click="confirmDeletePage" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import {
  type Component,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { useRoute } from 'vue-router'

import { apiRequest } from 'atomic'

import * as AtomicAtom from '../../../../nuxt/atomic/atom'
import * as AtomicMolecule from '../../../../nuxt/atomic/molecule'
import * as AtomicOrganism from '../../../../nuxt/atomic/organism'
import { COMPONENT_PROPS_SCHEMA } from './config/component_props_schema'
import { PAGE_BUILDER_WIDGETS } from './constants'
import type {
  PageBuilderLayoutInterface,
  PageBuilderNodeInterface,
  PageBuilderPageInterface,
  PageBuilderWidgetSourceType,
} from './types'
import { createLayout, createNode } from './utils'

const route = useRoute()
const lang = computed(() => String(route.params.lang ?? 'en'))
const baseUrl = computed(() => `${apiUrl()}/page-builder`)
const instance = getCurrentInstance()
const localAtomicComponents = buildLocalAtomicComponents()

const pages = ref<PageBuilderPageInterface[]>([])
const selectedPageId = ref<number | null>(null)
const selectedPageSlug = ref<string | null>(null)
const draggedWidget = ref<string | null>(null)
const canvasRef = ref<HTMLElement | null>(null)
const draggedNodeId = ref<string | null>(null)
const dropTargetIndex = ref<number | null>(null)
const autoScrollTimer = ref<ReturnType<typeof setInterval> | null>(null)
const selectedNodeId = ref<string | null>(null)
const confirmDeleteNodeId = ref<string | null>(null)
const confirmDeletePageId = ref<number | null>(null)
const widgetSearch = ref('')
const activeWidgetSource = ref<'all' | PageBuilderWidgetSourceType>('all')
const collapsedGroups = ref<Set<string>>(
  new Set(['Native', 'Atom', 'Molecule', 'Organism', 'Templates', 'Sections'])
)
const saveState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
const componentJsonError = ref<string | null>(null)
const lastSavedAt = ref<Date | null>(null)
const dirtySinceLastSave = ref(false)
const suppressAutosave = ref(false)
const autosaveTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const autosaveEnabled = ref(true)
const layout = reactive<PageBuilderLayoutInterface>(createLayout())
const pageStyleLang = ref<'css' | 'scss'>('css')
const pageCustomStyles = ref('')
const inspectorTab = ref<'widget' | 'page' | 'styles'>('widget')
const undoStack = ref<string[]>([])
const redoStack = ref<string[]>([])

const form = reactive({
  title: '',
  slug: '',
})

const selectedNode = computed<PageBuilderNodeInterface | null>(() => {
  if (!selectedNodeId.value) {
    return null
  }

  return (
    layout.children.find((node) => node.id === selectedNodeId.value) ?? null
  )
})

const widgetSources = computed<Array<'all' | PageBuilderWidgetSourceType>>(
  () => ['all', 'native', 'atomic', 'templates', 'sections']
)

const filteredWidgets = computed(() => {
  const query = widgetSearch.value.trim().toLowerCase()

  return PAGE_BUILDER_WIDGETS.filter((widget) => {
    const sourceMatch =
      activeWidgetSource.value === 'all' ||
      widget.source === activeWidgetSource.value
    const textMatch =
      query.length === 0 ||
      widget.label.toLowerCase().includes(query) ||
      widget.key.toLowerCase().includes(query)

    return sourceMatch && textMatch
  })
})

/* ─── Widget icons & grouping ─── */
const WIDGET_ICONS: Record<string, string> = {
  'native-heading': '🔤',
  'native-text': '📝',
  'native-button': '🔘',
  'native-image': '🖼️',
  'native-video': '🎬',
  'native-divider': '➖',
  'native-spacer': '↕️',
  'native-html': '🧩',
  'native-list': '📋',
  'native-quote': '💬',
  'native-code': '💻',
}

const GROUP_ICONS: Record<string, string> = {
  Native: '📦',
  Atom: '⚛',
  Molecule: '⌬',
  Organism: '🦠',
  Templates: '🧩',
  Sections: '📁',
}

interface WidgetGroup {
  key: string
  label: string
  icon: string
  widgets: typeof PAGE_BUILDER_WIDGETS
}

function getWidgetGroup(w: (typeof PAGE_BUILDER_WIDGETS)[number]): string {
  if (w.source === 'native') return 'Native'
  if (w.source === 'templates') return 'Templates'
  if (w.source === 'sections') return 'Sections'
  // Atomic: parse sub-type from label "Atomic Atom: X" → "Atom"
  const m = w.label.match(/^Atomic\s+(Atom|Molecule|Organism):\s+/)
  if (m) return m[1]
  return 'Other'
}

function getWidgetShortLabel(w: (typeof PAGE_BUILDER_WIDGETS)[number]): string {
  // "Atomic Atom: Avatar" → "Avatar"
  const m = w.label.match(/^Atomic\s+(?:Atom|Molecule|Organism):\s+(.+)$/)
  if (m) return m[1]
  // "Template: Grid Background" → "Grid Background"
  const t = w.label.match(/^(?:Template|Section):\s+(.+)$/)
  if (t) return t[1]
  return w.label
}

function widgetIcon(w: (typeof PAGE_BUILDER_WIDGETS)[number]): string {
  if (WIDGET_ICONS[w.key]) return WIDGET_ICONS[w.key]
  const group = getWidgetGroup(w)
  return GROUP_ICONS[group] ?? '📦'
}

const GROUP_ORDER = [
  'Native',
  'Atom',
  'Molecule',
  'Organism',
  'Templates',
  'Sections',
  'Other',
]

const groupedWidgets = computed<WidgetGroup[]>(() => {
  const map = new Map<string, (typeof PAGE_BUILDER_WIDGETS)[number][]>()
  for (const w of filteredWidgets.value) {
    const g = getWidgetGroup(w)
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(w)
  }
  const groups: WidgetGroup[] = []
  for (const key of GROUP_ORDER) {
    const widgets = map.get(key)
    if (widgets && widgets.length > 0) {
      groups.push({
        key,
        label: key,
        icon: GROUP_ICONS[key] ?? '📦',
        widgets,
      })
    }
  }
  return groups
})

function toggleGroup(key: string): void {
  const s = new Set(collapsedGroups.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  collapsedGroups.value = s
}

const saveLabel = computed(() => {
  if (saveState.value === 'saving') {
    return 'Saving...'
  }

  if (saveState.value === 'saved') {
    return 'Saved'
  }

  if (saveState.value === 'error') {
    return 'Autosave error'
  }

  return dirtySinceLastSave.value ? 'Unsaved changes' : 'Ready'
})

const lastSavedLabel = computed(() => {
  if (!lastSavedAt.value) {
    return ''
  }

  return lastSavedAt.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const hasTextProp = computed(() => {
  const type = selectedNode.value?.widgetType
  return (
    type === 'heading' ||
    type === 'text' ||
    type === 'button' ||
    type === 'quote'
  )
})

const componentPropsJson = computed(() => {
  if (!selectedNode.value || selectedNode.value.widgetType !== 'component') {
    return '{}'
  }

  const componentProps = selectedNode.value.props.componentProps

  try {
    return JSON.stringify(componentProps ?? {}, null, 2)
  } catch {
    return '{}'
  }
})

const activeComponentSchema = computed(() => {
  if (!selectedNode.value || selectedNode.value.widgetType !== 'component') {
    return []
  }
  const tag = String(selectedNode.value.props.componentTag ?? '').trim()
  return COMPONENT_PROPS_SCHEMA[tag] ?? []
})

function getComponentProp(key: string): unknown {
  if (!selectedNode.value) return undefined
  const props = selectedNode.value.props.componentProps
  if (props && typeof props === 'object') {
    return (props as Record<string, unknown>)[key]
  }
  return undefined
}

function setComponentProp(key: string, value: unknown): void {
  if (!selectedNode.value) return
  let props = selectedNode.value.props.componentProps
  if (!props || typeof props !== 'object') {
    props = {}
  }
  ;(props as Record<string, unknown>)[key] = value
  selectedNode.value.props.componentProps = props
  dirtySinceLastSave.value = true
}

function setComponentPropJson(key: string, raw: string): void {
  try {
    const parsed = JSON.parse(raw)
    setComponentProp(key, parsed)
    componentJsonError.value = null
  } catch {
    componentJsonError.value = `Invalid JSON for "${key}"`
  }
}

function jsonStringify(value: unknown): string {
  if (value === undefined || value === null) return ''
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
  }
}

watch(
  () => form.title,
  (value) => {
    if (!form.slug && value) {
      form.slug = value.toLowerCase().trim().replace(/\s+/g, '-')
    }
  }
)

onMounted(async () => {
  await fetchPages()
  await loadUserPreferences()
  window.addEventListener('keydown', onKeyboardShortcut)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyboardShortcut)
  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value)
  }
  stopAutoScroll()
})

async function loadUserPreferences(): Promise<void> {
  try {
    const prefs = await apiRequest<Record<string, unknown>>(
      `${baseUrl.value}/preferences`
    )
    if (prefs && typeof prefs === 'object') {
      autosaveEnabled.value =
        (prefs as Record<string, unknown>).autosave !== false
    }
  } catch {
    // Ignore – default stays true
  }
}

async function saveUserPreferences(): Promise<void> {
  try {
    await apiRequest(`${baseUrl.value}/preferences`, 'PUT', {
      preferences: { autosave: autosaveEnabled.value },
    })
  } catch {
    // Silent fail
  }
}

watch(autosaveEnabled, () => {
  saveUserPreferences()
})

async function fetchPages(): Promise<void> {
  const response = await apiRequest<{ data: PageBuilderPageInterface[] }>(
    `${baseUrl.value}/pages`
  )

  pages.value = extractData<PageBuilderPageInterface[]>(response) ?? []
}

async function loadPage(id: number): Promise<void> {
  const response = await apiRequest<{ data: PageBuilderPageInterface }>(
    `${baseUrl.value}/pages/${id}`
  )
  const page = extractData<PageBuilderPageInterface>(response)
  if (!page) {
    return
  }

  suppressAutosave.value = true
  selectedPageId.value = page.id
  selectedPageSlug.value = page.slug
  form.title = page.title
  form.slug = page.slug

  const pageVersions = Array.isArray(page.versions)
    ? page.versions
    : ((page as { versions?: { data?: PageBuilderPageInterface['versions'] } })
        .versions?.data ?? [])

  const selectedLayout =
    pageVersions?.[0]?.layout_json ?? page.published_version?.layout_json
  replaceLayout(selectedLayout ?? createLayout())
  dirtySinceLastSave.value = false
  saveState.value = 'idle'
  setTimeout(() => {
    suppressAutosave.value = false
  }, 0)
}

async function createPage(): Promise<void> {
  const nextTitle = form.title || `New page ${pages.value.length + 1}`
  const response = await apiRequest<{ page: PageBuilderPageInterface }>(
    `${baseUrl.value}/pages`,
    'POST',
    {
      title: nextTitle,
      slug: form.slug || nextTitle.toLowerCase().replace(/\s+/g, '-'),
    }
  )

  const page = extractData<PageBuilderPageInterface>(response)
  if (!page) {
    await fetchPages()
    return
  }

  await fetchPages()
  await loadPage(page.id)
}

async function saveDraft(): Promise<void> {
  if (!selectedPageId.value) {
    return
  }

  saveState.value = 'saving'

  try {
    await apiRequest(
      `${baseUrl.value}/pages/${selectedPageId.value}/draft`,
      'POST',
      {
        layout_json: layout,
      }
    )

    dirtySinceLastSave.value = false
    lastSavedAt.value = new Date()
    saveState.value = 'saved'
  } catch {
    saveState.value = 'error'
  }
}

async function publishPage(): Promise<void> {
  if (!selectedPageId.value) {
    return
  }

  // Ensure latest canvas state is persisted before selecting version to publish.
  await saveDraft()

  await apiRequest(
    `${baseUrl.value}/pages/${selectedPageId.value}/publish`,
    'POST'
  )

  await apiRequest(`${baseUrl.value}/pages/${selectedPageId.value}`, 'PUT', {
    title: form.title,
    slug: form.slug,
    status: 'published',
    meta_json: {
      metaTitle: layout.settings.metaTitle ?? '',
      metaDescription: layout.settings.metaDescription ?? '',
      ogImage: layout.settings.ogImage ?? '',
    },
  })

  selectedPageSlug.value = form.slug
  await fetchPages()
}

function onWidgetDragStart(widgetKey: string): void {
  draggedWidget.value = widgetKey
  draggedNodeId.value = null
  dropTargetIndex.value = null
}

function onCanvasDragOver(event: DragEvent): void {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }

  // ── Auto-scroll when near edges ──
  const canvasRect = canvas.getBoundingClientRect()
  const edgeZone = 60
  const mouseY = event.clientY

  if (mouseY < canvasRect.top + edgeZone) {
    const intensity = 1 - (mouseY - canvasRect.top) / edgeZone
    startAutoScroll(-Math.max(8, intensity * 28))
  } else if (mouseY > canvasRect.bottom - edgeZone) {
    const intensity = 1 - (canvasRect.bottom - mouseY) / edgeZone
    startAutoScroll(Math.max(8, intensity * 28))
  } else {
    stopAutoScroll()
  }

  // ── Determine drop index from mouse Y vs node midpoints ──
  const nodeEls = canvas.querySelectorAll<HTMLElement>('[data-node-index]')
  let targetIndex = layout.children.length

  for (const el of nodeEls) {
    const rect = el.getBoundingClientRect()
    const midY = rect.top + rect.height / 2
    const idx = Number(el.dataset.nodeIndex)

    if (mouseY < midY) {
      targetIndex = idx
      break
    }
  }

  dropTargetIndex.value = targetIndex
}

function onCanvasDragLeave(): void {
  dropTargetIndex.value = null
  stopAutoScroll()
}

function onCanvasDrop(): void {
  stopAutoScroll()

  const target = dropTargetIndex.value ?? layout.children.length

  if (draggedNodeId.value) {
    moveDraggedNodeToIndex(target)
    resetNodeDragState()
    return
  }

  if (draggedWidget.value) {
    insertWidgetAt(draggedWidget.value, target)
    draggedWidget.value = null
    dropTargetIndex.value = null
  }
}

function startAutoScroll(speed: number): void {
  stopAutoScroll()
  autoScrollTimer.value = setInterval(() => {
    window.scrollBy({ top: speed })
  }, 16)
}

function stopAutoScroll(): void {
  if (autoScrollTimer.value) {
    clearInterval(autoScrollTimer.value)
    autoScrollTimer.value = null
  }
}

function addWidget(widgetKey: string): void {
  insertWidgetAt(widgetKey, layout.children.length)
}

function insertWidgetAt(widgetKey: string, index: number): void {
  pushUndo()
  const node = createNode(widgetKey)
  layout.children.splice(index, 0, node)
  selectedNodeId.value = node.id
}

function selectNode(nodeId: string): void {
  selectedNodeId.value = nodeId
}

function onNodeDragStart(nodeId: string): void {
  draggedNodeId.value = nodeId
  dropTargetIndex.value = null
  draggedWidget.value = null
}

function onNodeDragEnd(): void {
  stopAutoScroll()
  resetNodeDragState()
}

function onNodePropChange(key: string, value: unknown): void {
  if (!selectedNode.value) {
    return
  }

  selectedNode.value.props[key] = value
  dirtySinceLastSave.value = true
}

function onComponentPropsJsonInput(value: string): void {
  if (!selectedNode.value || selectedNode.value.widgetType !== 'component') {
    return
  }

  try {
    const parsed = JSON.parse(value)
    selectedNode.value.props.componentProps =
      parsed && typeof parsed === 'object' ? parsed : {}
    componentJsonError.value = null
  } catch {
    componentJsonError.value = 'Invalid JSON format.'
  }
}

function onCustomStylesInput(value: string): void {
  pageCustomStyles.value = value
  layout.settings.customStyles = value
  layout.settings.styleLang = pageStyleLang.value
  dirtySinceLastSave.value = true
}

function onSettingChange(key: string, value: unknown): void {
  layout.settings[key] = value
  dirtySinceLastSave.value = true
}

watch(pageStyleLang, (lang) => {
  layout.settings.styleLang = lang
  dirtySinceLastSave.value = true
})

// ─── Undo / Redo ───
const MAX_UNDO = 50

function pushUndo(): void {
  undoStack.value.push(
    JSON.stringify({ children: layout.children, settings: layout.settings })
  )
  if (undoStack.value.length > MAX_UNDO) {
    undoStack.value.shift()
  }
  redoStack.value = []
}

function undo(): void {
  const snapshot = undoStack.value.pop()
  if (!snapshot) return
  redoStack.value.push(
    JSON.stringify({ children: layout.children, settings: layout.settings })
  )
  const parsed = JSON.parse(snapshot)
  layout.children = parsed.children ?? []
  layout.settings = parsed.settings ?? {}
  pageCustomStyles.value = String(layout.settings.customStyles ?? '')
  pageStyleLang.value = layout.settings.styleLang === 'scss' ? 'scss' : 'css'
  dirtySinceLastSave.value = true
}

function redo(): void {
  const snapshot = redoStack.value.pop()
  if (!snapshot) return
  undoStack.value.push(
    JSON.stringify({ children: layout.children, settings: layout.settings })
  )
  const parsed = JSON.parse(snapshot)
  layout.children = parsed.children ?? []
  layout.settings = parsed.settings ?? {}
  pageCustomStyles.value = String(layout.settings.customStyles ?? '')
  pageStyleLang.value = layout.settings.styleLang === 'scss' ? 'scss' : 'css'
  dirtySinceLastSave.value = true
}

function componentTag(node: PageBuilderNodeInterface): string {
  return String(node.props.componentTag ?? 'div').trim()
}

function toPascalCase(tag: string): string {
  return tag
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function buildLocalAtomicComponents(): Record<string, Component> {
  const exportsMap = {
    ...AtomicAtom,
    ...AtomicMolecule,
    ...AtomicOrganism,
  } as Record<string, unknown>

  const map: Record<string, Component> = {}

  for (const [name, value] of Object.entries(exportsMap)) {
    if (!name.startsWith('Ad') || !value) {
      continue
    }

    const kebab = name
      .replace(
        /[A-Z]/g,
        (char, index) => `${index > 0 ? '-' : ''}${char.toLowerCase()}`
      )
      .trim()

    map[name] = value as Component
    map[kebab] = value as Component
  }

  return map
}

function resolvedComponentTag(
  node: PageBuilderNodeInterface
): string | Component {
  const rawTag = componentTag(node)
  const pascalTag = toPascalCase(rawTag)
  const components = instance?.appContext.components ?? {}

  if (localAtomicComponents[rawTag]) {
    return localAtomicComponents[rawTag]
  }

  if (localAtomicComponents[pascalTag]) {
    return localAtomicComponents[pascalTag]
  }

  if (components[rawTag]) {
    return rawTag
  }

  if (components[pascalTag]) {
    return pascalTag
  }

  return rawTag
}

function componentProps(
  node: PageBuilderNodeInterface
): Record<string, unknown> {
  const props = node.props.componentProps
  if (props && typeof props === 'object') {
    return props as Record<string, unknown>
  }

  return {}
}

const WIDGET_DISPLAY_NAMES: Record<string, string> = {
  heading: '📝 Heading',
  text: '📄 Text',
  button: '🔘 Button',
  image: '🖼️ Image',
  video: '🎬 Video',
  divider: '➖ Divider',
  spacer: '↕️ Spacer',
  html: '🧩 HTML',
  list: '📋 List',
  quote: '💬 Blockquote',
  code: '🖥️ Code Block',
}

function componentGroupIcon(tag: string): string {
  if (tag.startsWith('nuc-section-')) return GROUP_ICONS['Sections'] ?? '📁'
  if (tag.startsWith('nuc-')) return GROUP_ICONS['Templates'] ?? '🧩'
  // Atomic: find in registry to determine atom/molecule/organism
  const def = PAGE_BUILDER_WIDGETS.find((w) => w.componentTag === tag)
  if (def) {
    const group = getWidgetGroup(def)
    return GROUP_ICONS[group] ?? '⚛'
  }
  return '⚛'
}

function widgetDisplayName(node: PageBuilderNodeInterface): string {
  if (node.widgetType === 'component') {
    const tag = componentTag(node)
    return `${componentGroupIcon(tag)} ${tag}`
  }

  return WIDGET_DISPLAY_NAMES[node.widgetType] ?? node.widgetType
}

function nodePreviewText(node: PageBuilderNodeInterface): string {
  if (node.widgetType === 'component') {
    const propCount = Object.keys(componentProps(node)).length
    return `${componentTag(node)} (${propCount} props)`
  }

  return String(node.props.text ?? '')
}

function listItems(node: PageBuilderNodeInterface): string[] {
  const raw = String(node.props.items ?? '')
  return raw.split('\n').filter((l: string) => l.trim() !== '')
}

function moveDraggedNodeToIndex(targetIndex: number): void {
  if (!draggedNodeId.value) {
    return
  }

  const fromIndex = layout.children.findIndex(
    (node) => node.id === draggedNodeId.value
  )
  if (fromIndex < 0) {
    return
  }

  pushUndo()
  const [movedNode] = layout.children.splice(fromIndex, 1)
  if (!movedNode) {
    return
  }

  const normalizedIndex =
    fromIndex < targetIndex ? targetIndex - 1 : targetIndex
  const boundedIndex = Math.max(
    0,
    Math.min(normalizedIndex, layout.children.length)
  )

  layout.children.splice(boundedIndex, 0, movedNode)
  selectedNodeId.value = movedNode.id
  dirtySinceLastSave.value = true
}

function resetNodeDragState(): void {
  draggedNodeId.value = null
  dropTargetIndex.value = null
}

function removeNode(nodeId: string): void {
  confirmDeleteNodeId.value = nodeId
}

const confirmDeleteNodeName = computed(() => {
  if (!confirmDeleteNodeId.value) return ''
  const node = layout.children.find((n) => n.id === confirmDeleteNodeId.value)
  return node ? widgetDisplayName(node) : ''
})

function confirmRemoveNode(): void {
  const nodeId = confirmDeleteNodeId.value
  confirmDeleteNodeId.value = null
  if (!nodeId) return

  const index = layout.children.findIndex((node) => node.id === nodeId)
  if (index < 0) return

  pushUndo()
  layout.children.splice(index, 1)

  if (selectedNodeId.value === nodeId) {
    selectedNodeId.value = null
  }

  dirtySinceLastSave.value = true
}

const confirmDeletePageName = computed(() => {
  if (!confirmDeletePageId.value) return ''
  const page = pages.value.find((p) => p.id === confirmDeletePageId.value)
  return page?.title ?? ''
})

async function confirmDeletePage(): Promise<void> {
  const pageId = confirmDeletePageId.value
  confirmDeletePageId.value = null
  if (!pageId) return

  try {
    await apiRequest(`${baseUrl.value}/pages/${pageId}`, 'DELETE')
  } catch {
    // silent
  }

  if (selectedPageId.value === pageId) {
    selectedPageId.value = null
    selectedPageSlug.value = null
    selectedNodeId.value = null
    Object.assign(layout, createLayout())
    form.title = ''
    form.slug = ''
  }

  await fetchPages()
}

function extractData<T>(response: unknown): T | null {
  let current: unknown = response

  for (let depth = 0; depth < 4; depth++) {
    if (!current || typeof current !== 'object') {
      break
    }

    if ('page' in current) {
      current = (current as { page: unknown }).page
      continue
    }

    if ('data' in current) {
      current = (current as { data: unknown }).data
      continue
    }

    break
  }

  return (current as T) ?? null
}

function replaceLayout(nextLayout: PageBuilderLayoutInterface): void {
  layout.id = nextLayout.id
  layout.type = nextLayout.type
  layout.settings = nextLayout.settings
  layout.children = nextLayout.children ?? []
  selectedNodeId.value = null

  // Restore custom styles from settings
  pageCustomStyles.value = String(layout.settings.customStyles ?? '')
  pageStyleLang.value = layout.settings.styleLang === 'scss' ? 'scss' : 'css'
}

function scheduleAutosave(): void {
  if (
    !selectedPageId.value ||
    suppressAutosave.value ||
    !autosaveEnabled.value
  ) {
    return
  }

  dirtySinceLastSave.value = true
  saveState.value = 'idle'

  if (autosaveTimer.value) {
    clearTimeout(autosaveTimer.value)
  }

  autosaveTimer.value = setTimeout(async () => {
    await saveDraft()
  }, 1100)
}

function onKeyboardShortcut(event: KeyboardEvent): void {
  const mod = event.ctrlKey || event.metaKey
  if (!mod) return

  const key = event.key.toLowerCase()

  if (key === 's') {
    event.preventDefault()
    void saveDraft()
  } else if (key === 'z' && !event.shiftKey) {
    event.preventDefault()
    undo()
  } else if (key === 'z' && event.shiftKey) {
    event.preventDefault()
    redo()
  } else if (key === 'y') {
    event.preventDefault()
    redo()
  }
}

watch(
  [() => form.title, () => form.slug, () => layout.children],
  () => {
    scheduleAutosave()
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
/* ─── Base ─── */
.pb-editor {
  height: 100vh;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(ellipse at 70% -5%, rgba(16, 185, 129, 0.10), transparent 50%),
    radial-gradient(ellipse at 10% 15%, rgba(16, 185, 129, 0.06), transparent 40%),
    #020504;
}

.pb-panel {
  background: rgba(8, 12, 10, 0.92);
  border: 1px solid #1a2e24;
  border-radius: 14px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.40);
  color: #d4dbd7;
  backdrop-filter: blur(6px);
}

/* ─── Top bar ─── */
.pb-topbar {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 10;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding: 8px 14px;
}

.pb-topbar-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.pb-input-title {
  max-width: 220px;
  font-weight: 600;
}

.pb-slug-prefix {
  font-size: 12px;
  color: #4b5e55;
  white-space: nowrap;
  user-select: none;
}

.pb-input-slug {
  max-width: 140px;
  font-size: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.pb-topbar-center {
  flex-shrink: 0;
}

.pb-topbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.pb-topbar-sep {
  width: 1px;
  height: 20px;
  background: #1a2e24;
  margin: 0 2px;
}

.pb-autosave-toggle {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    appearance: none;
    width: 28px;
    height: 16px;
    background: #1a2e24;
    border-radius: 999px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background: #6b7a72;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    &:checked {
      background: #10b98140;

      &::after {
        left: 14px;
        background: #10b981;
      }
    }
  }
}

.pb-autosave-label {
  font-size: 11px;
  color: #6b7a72;
  font-weight: 500;
}

.pb-btn-sm {
  padding: 4px 10px;
  font-size: 14px;
  min-width: 0;
}

.pb-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7a72;
  white-space: nowrap;
}

.pb-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6b7a72;
  flex-shrink: 0;
}

.pb-status-saved .pb-status-dot {
  background: #10b981;
}

.pb-status-saving .pb-status-dot {
  background: #34d399;
  animation: pulse-dot 1s infinite;
}

.pb-status-error .pb-status-dot {
  background: #ef4444;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.pb-status-saved {
  color: #10b981;
}

.pb-status-saving {
  color: #34d399;
}

.pb-status-error {
  color: #ef4444;
}

.pb-status-time {
  color: #4b5e55;
  font-weight: 400;
}

/* ─── Layout grid ─── */
.pb-layout {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 14px;
  flex: 1;
  min-height: 0;
}

.pb-sidebar,
.pb-canvas-wrapper,
.pb-inspector {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  min-height: 0;
}

.pb-inspector-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 14px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #1a2e24;
}

.pb-inspector-tab {
  flex: 1;
  padding: 6px 0;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  background: #060d09;
  color: #6b7a72;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
}

.pb-inspector-tab:not(:last-child) {
  border-right: 1px solid #1a2e24;
}

.pb-inspector-tab:hover {
  color: #b8c5be;
}

.pb-inspector-tab.active {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.pb-inspector-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
}

.pb-inspector-section {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #4b5e55;
  margin: 8px 0 2px;
  padding-bottom: 4px;
  border-bottom: 1px solid #1a2e24;
}

.pb-color-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pb-color-input {
  width: 36px;
  height: 30px;
  border: 1px solid #1a2e24;
  border-radius: 6px;
  background: #060d09;
  cursor: pointer;
  padding: 2px;
  flex-shrink: 0;
}

.pb-color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.pb-color-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.pb-info-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 12px;
  font-size: 12px;
  color: #6b7a72;
}

.pb-info-grid span:nth-child(even) {
  color: #b8c5be;
  font-weight: 500;
}

.pb-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.pb-widget-header {
  margin-top: 14px;
}

.pb-chip {
  padding: 2px 8px;
  border-radius: 999px;
  background: #10b98118;
  color: #34d399;
  font-size: 12px;
  font-weight: 600;
}

/* ─── Source filter tabs ─── */
.pb-source-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0;
}

.pb-source-tab {
  border: 1px solid #1a2e24;
  border-radius: 999px;
  padding: 5px 10px;
  background: #060d09;
  color: #8fa89a;
  cursor: pointer;
  font-size: 12px;
  text-transform: capitalize;
  transition: all 0.15s ease;
}

.pb-source-tab:hover {
  border-color: #10b98140;
  color: #d4dbd7;
}

.pb-source-tab.active {
  background: #10b981;
  color: #021a0f;
  border-color: #10b981;
  font-weight: 600;
}

/* ─── Pages list ─── */
.pb-pages-list {
  list-style: none;
  margin: 0 0 16px 0;
  padding: 0;
}

.pb-page-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  text-align: left;
  margin-bottom: 6px;
  border: 1px solid #1a2e24;
  border-radius: 10px;
  padding: 10px 12px;
  background: #060d09;
  color: #d4dbd7;
  cursor: pointer;
  transition: all 0.18s ease;
}

.pb-page-item:hover {
  border-color: #10b98140;
  background: #0a1510;
}

.pb-page-item.active {
  border-color: #10b981;
  background: #10b98112;
}

.pb-page-item small {
  color: #6b7a72;
  font-size: 11px;
}

.pb-page-item-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.pb-page-delete {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: #6b7a72;
  font-size: 10px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.pb-page-item:hover .pb-page-delete {
  opacity: 1;
}

.pb-page-delete:hover {
  border-color: #ef444450;
  background: #7f1d1d20;
  color: #fca5a5;
}

/* ─── Widget search ─── */
.pb-widget-search-row {
  position: relative;
  margin-bottom: 2px;
}

.pb-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  pointer-events: none;
  opacity: 0.5;
}

.pb-input-search {
  padding-left: 30px !important;
}

/* ─── Widget groups ─── */
.pb-widget-groups {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pb-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  margin: 0;
  border: none;
  border-radius: 8px;
  background: #0c1a13;
  color: #b8c5be;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: all 0.15s ease;
}

.pb-group-header:hover {
  background: #10201a;
  color: #d4dbd7;
}

.pb-group-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pb-group-icon {
  font-size: 13px;
  line-height: 1;
}

.pb-group-label {
  line-height: 1;
}

.pb-group-header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pb-chip-sm {
  padding: 1px 6px;
  border-radius: 999px;
  background: #10b98114;
  color: #34d399;
  font-size: 10px;
  font-weight: 600;
}

.pb-group-chevron {
  font-size: 14px;
  font-weight: 700;
  color: #4b5e55;
  transition: transform 0.2s ease;
  display: inline-block;
  transform: rotate(90deg);
}

.pb-group-header.collapsed .pb-group-chevron {
  transform: rotate(0deg);
}

/* ─── Widget grid ─── */
.pb-widget-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  padding: 4px 0 8px 0;
}

.pb-widget-grid-2col {
  grid-template-columns: 1fr 1fr;
}

/* ─── Widget card ─── */
.pb-widget-card {
  border: 1px solid #1a2e24;
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  text-align: left;
  background: #060d09;
  color: #d4dbd7;
  cursor: grab;
  transition: all 0.18s ease;
  font-size: 12px;
  line-height: 1.2;
  min-height: 36px;
}

.pb-widget-card:hover {
  border-color: #10b98150;
  background: #0a1510;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px #10b98112;
}

.pb-widget-card:active {
  cursor: grabbing;
  transform: scale(0.97);
}

.pb-widget-card-icon {
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
}

.pb-widget-card-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pb-widget-card-native .pb-widget-card-label {
  font-weight: 500;
}

/* ─── Canvas ─── */
.pb-canvas {
  flex: 1;
  border: 1px dashed #1a2e24;
  border-radius: 10px;
  padding: 12px;
  background: rgba(3, 8, 6, 0.55);
}

/* ─── Drop indicator ─── */
.pb-drop-indicator {
  height: 0;
  margin: 0;
  transition: all 0.12s ease;
  border-radius: 3px;
  pointer-events: none;
}

.pb-drop-indicator.active {
  height: 4px;
  margin: 4px 0;
  background: #10b981;
  box-shadow: 0 0 8px #10b98160;
}

/* ─── Nodes ─── */
.pb-node {
  border: 1px solid #1a2e24;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: rgba(6, 13, 9, 0.55);
  color: #d4dbd7;
}

.pb-node:hover {
  border-color: #10b98130;
}

.pb-node.dragging {
  opacity: 0.35;
}

.pb-node-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.pb-node-delete {
  border: 1px solid #ef444450;
  background: #7f1d1d20;
  color: #fca5a5;
  border-radius: 999px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.pb-node-delete:hover {
  background: #7f1d1d40;
}

.pb-node.selected {
  border-color: #10b981;
  box-shadow: 0 0 0 2px #10b98120;
}

.pb-node-title {
  display: block;
  font-size: 12px;
  color: #6b7a72;
}

.pb-node-text {
  font-size: 14px;
}

/* ─── Inline previews for native widgets ─── */
.pb-inline-preview {
  margin-top: 8px;
  max-width: 100%;
}

.pb-btn-preview {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 8px;
  background: #10b981;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  cursor: default;
}

.pb-image-preview {
  border-radius: 8px;
  max-height: 260px;
  object-fit: contain;
}

.pb-video-preview {
  border-radius: 8px;
  overflow: hidden;
}

.pb-video-preview iframe {
  display: block;
  max-width: 100%;
}

.pb-divider-preview {
  border: none;
  border-top: 2px solid #1a2e24;
  margin: 10px 0;
}

.pb-spacer-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #1a2e24;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.04);
}

.pb-spacer-label {
  font-size: 11px;
  color: #4b5e55;
}

.pb-html-preview {
  padding: 8px;
  border: 1px dashed #1a2e24;
  border-radius: 8px;
  background: #060d09;
  overflow: auto;
  max-height: 260px;
}

.pb-list-preview {
  padding-left: 22px;
  font-size: 14px;
  color: #d4dbd7;
}

.pb-list-preview li {
  margin-bottom: 2px;
}

.pb-quote-preview {
  border-left: 4px solid #10b981;
  padding: 10px 16px;
  margin: 4px 0;
  background: rgba(16, 185, 129, 0.06);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #b8c5be;
}

.pb-quote-preview cite {
  display: block;
  margin-top: 6px;
  font-style: normal;
  font-size: 12px;
  color: #6b7a72;
}

.pb-code-preview {
  padding: 12px 14px;
  border-radius: 8px;
  background: #060d09;
  color: #10b981;
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  overflow-x: auto;
  white-space: pre-wrap;
  border: 1px solid #1a2e24;
}

.pb-inspector-type {
  margin: 0 0 8px;
  padding: 4px 8px;
  background: rgba(16, 185, 129, 0.12);
  border-radius: 6px;
  font-size: 12px;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.pb-label-inline {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.pb-label-inline input[type='checkbox'] {
  width: auto;
  accent-color: #10b981;
}

.pb-textarea-code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  min-height: 100px;
}

/* ─── Page Styles panel ─── */
.pb-inspector-divider {
  border: none;
  border-top: 1px solid #1a2e24;
  margin: 16px 0;
}

.pb-styles-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.pb-styles-lang-toggle {
  display: flex;
  gap: 4px;
}

.pb-chip-btn {
  padding: 4px 14px;
  border-radius: 6px;
  border: 1px solid #1a2e24;
  background: #060d09;
  color: #6b7a72;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.pb-chip-btn:hover {
  border-color: #10b981;
  color: #b8c5be;
}

.pb-chip-btn.active {
  background: rgba(16, 185, 129, 0.15);
  border-color: #10b981;
  color: #10b981;
}

.pb-styles-editor {
  min-height: 180px;
  resize: vertical;
}

.pb-styles-hint {
  font-size: 11px;
  color: #4b5e55;
  line-height: 1.5;
}

.pb-styles-hint code {
  background: rgba(16, 185, 129, 0.1);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 11px;
  color: #10b981;
}

.pb-node-render {
  margin-top: 8px;
  padding: 8px;
  border: 1px dashed #1a2e24;
  border-radius: 8px;
  background: #030806;
  position: relative;
  transform: translateZ(0);
  isolation: isolate;
  overflow: clip;
  min-height: 78px;
}

.pb-node-render :deep(*) {
  max-width: 100%;
}

/* Keep fixed/sticky components inside preview sandbox in builder mode. */
.pb-node-render :deep(.fixed),
.pb-node-render :deep([class*=' fixed']),
.pb-node-render :deep([class^='fixed']),
.pb-node-render :deep([style*='position: fixed']),
.pb-node-render :deep([style*='position:fixed']),
.pb-node-render :deep([style*='position: sticky']),
.pb-node-render :deep([style*='position:sticky']) {
  position: absolute !important;
  inset: 0 auto auto 0 !important;
  width: 100% !important;
  z-index: 2 !important;
}

/* ─── Form controls ─── */
.pb-input,
.pb-textarea {
  width: 100%;
  border: 1px solid #1a2e24;
  border-radius: 8px;
  padding: 8px 10px;
  background: #060d09;
  color: #d4dbd7;
  transition: border-color 0.15s ease;
}

.pb-input:focus,
.pb-textarea:focus {
  outline: none;
  border-color: #10b98180;
}

.pb-label {
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
  color: #8fa89a;
}

.pb-textarea {
  min-height: 120px;
}

/* ─── Buttons ─── */
.pb-btn {
  border: 1px solid #1a2e24;
  border-radius: 8px;
  padding: 8px 14px;
  background: #060d09;
  color: #d4dbd7;
  text-decoration: none;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s ease;
}

.pb-btn:hover {
  border-color: #10b98140;
  background: #0a1510;
}

.pb-btn-primary {
  border-color: #10b981;
  background: #10b981;
  color: #021a0f;
  font-weight: 600;
}

.pb-btn-primary:hover {
  background: #10a674;
  border-color: #10a674;
}

.pb-btn-full {
  width: 100%;
  margin-bottom: 12px;
}

/* ─── Misc ─── */
.pb-hint {
  color: #6b7a72;
  margin-bottom: 8px;
  font-size: 13px;
}

.pb-empty,
.pb-empty-small {
  color: #6b7a72;
  font-size: 13px;
}

.pb-error {
  margin: 0;
  font-size: 12px;
  color: #ef4444;
}

@media (max-width: 1280px) {
  .pb-layout {
    grid-template-columns: 1fr;
  }
}

/* ─── Confirm dialog ─── */
:global(.pb-confirm-dialog.p-dialog) {
  width: 95vw !important;
  max-width: 440px !important;
  background: rgb(0 0 0 / 60%) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(16, 185, 129, 0.2) !important;
  border-radius: 16px !important;
  color: #f5f4f4 !important;
  box-shadow: 0 24px 64px rgb(0 0 0 / 50%), 0 0 0 1px rgb(255 255 255 / 4%) inset;
}

:global(.pb-confirm-dialog .p-dialog-header) {
  background: transparent !important;
  padding: 1.25rem 1.5rem 0.5rem !important;
}

:global(.pb-confirm-dialog .p-dialog-content) {
  background: transparent !important;
  padding: 0.5rem 1.5rem 1rem !important;
}

:global(.pb-confirm-dialog .p-dialog-footer) {
  background: transparent !important;
  padding: 0.75rem 1.5rem 1.25rem !important;
  border-top: 1px solid rgba(63, 63, 70, 0.5);
}

:global(.pb-confirm-dialog .p-dialog-header-actions .p-button) {
  color: #10b981 !important;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  transition: all 0.15s ease;
}

:global(.pb-confirm-dialog .p-dialog-header-actions .p-button:hover) {
  background: rgba(16, 185, 129, 0.12) !important;
  border-color: #10b981;
}

.pb-confirm-title {
  font-weight: 600;
  font-size: 18px;
  color: #f5f4f4;
}

.pb-confirm-text {
  color: #d4dbd7;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;

  strong {
    color: #f5f4f4;
  }
}

.pb-confirm-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>

