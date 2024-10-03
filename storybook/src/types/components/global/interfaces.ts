import { Component } from 'vue'

export interface GlobalComponentsRegistryInterface {
    [key: string]: Component
}
