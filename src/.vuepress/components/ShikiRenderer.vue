<template>
    <div v-html="highlightedCode"></div>
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
let highlighter = undefined;

export default {
    props: {
        code: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
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
            this.highlightedCode = highlighter?.codeToHtml(
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
        if(highlighter === undefined)
            highlighter = await createHighlighter({themes: Object.values(shikiThemes), langs: ['cpp','text']});
        this.update();
    },
    updated() {
        this.update();
    }
};

</script>