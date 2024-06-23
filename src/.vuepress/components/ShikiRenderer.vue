<template>
    <div v-html="highlightedCode"></div>
</template>

<script>
import {createHighlighter} from 'shiki';

const addClassTransformer = {
  name: 'vuepress:add-class',
  pre(node) {
    this.addClassToHast(node, 'vp-code')
  },
}

const shikiThemes = {light:"github-light", dark:"one-dark-pro"};

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
                    addClassTransformer,
                ]}) ?? '';
        }
    },
    async mounted() {
        highlighter = createHighlighter({themes: Object.values(shikiThemes), langs: ['cpp']});
        this.update();
    },
    updated() {
        this.update();
    }
};

</script>