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

const highlighter = await createHighlighter({themes: Object.values(shikiThemes), langs: ['cpp']});

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
            highlightedCode: ''
        };
    },
    methods: {
        update(){
            this.highlightedCode = highlighter.codeToHtml(
                this.code,{themes: shikiThemes, lang: this.language, transformers: [
                    addClassTransformer,
                ]});
        }
    },
    async mounted() {
        this.update();
    },
    updated() {
        this.update();
    }
};

</script>