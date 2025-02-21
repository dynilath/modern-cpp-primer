<template>
    <div v-html="highlightedCode" :class="['code-container', {item: type === 'item'}]"></div>
</template>

<script>
import {createHighlighter} from 'shiki';
import {
    transformerNotationHighlight,
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationWordHighlight,
} from '@shikijs/transformers';

const addClassTransformer = {
  name: 'vuepress:add-class',
  pre(node) {
    this.addClassToHast(node, 'vp-code')
  },
}

const shikiThemes = {light:"github-light", dark:"github-dark"};

const HighLighterTag = 'MCPHighLighterTag'; // to avoid conflict with

async function createHighLighter() {
    if(window[HighLighterTag] === undefined)
        window[HighLighterTag] = await createHighlighter({themes: Object.values(shikiThemes), langs: ['cpp','text']});
}

function highLighter() {
    return window[HighLighterTag];
}

export default {
    props: {
        code: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'block'
        }
    },
    data() {
        return {
            highlightedCode: '',
            highlighter: undefined
        };
    },
    methods: {
        update(){
            this.highlightedCode = highLighter()?.codeToHtml(
                this.code,{themes: shikiThemes, lang: this.language, transformers: [
                    transformerNotationHighlight(),
                    transformerNotationDiff(),
                    transformerNotationErrorLevel(),
                    transformerNotationWordHighlight(),
                    addClassTransformer,
                ]}) ?? '';
        }
    },
    async mounted() {
        await createHighLighter();
        this.update();
    },
    updated() {
        this.update();
    }
};

</script>

<style>
.code-container {
    position: relative;
    border-radius: 6px; 
    font-size: 16px;
    padding: 0.2rem;
}

.code-container.item {
    padding: 0;
}

.code-container pre {
    display: block; 
    position: relative; 
    z-index: 1; 
    overflow: auto; 
    border-radius: 6px; 
    font-size: 16px; 
    background: var(--code-c-bg) !important;
    line-height: 1.6; 
}

.code-container.item pre {
    margin: 0 !important;
    background: transparent !important;
}

.code-container pre code {
    display: block; 
    box-sizing: border-box; 
    width: fit-content; 
    border-radius: 0;
    padding: 1.25rem;
    background: transparent;
}

.code-container.item pre code {
    padding: 0.1rem !important;
}
</style>