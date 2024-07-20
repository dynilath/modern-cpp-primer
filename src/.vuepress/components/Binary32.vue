<template>
    <div class="b32display">
        <div class="pheader">
            <p>binary32 表示</p>
        </div>
        <div class="container">
            <div>
                <p>符号</p>
                <div class="checkbox-list">
                    <input type="checkbox" class="checkbox-item" v-for="(c, index) in data.sign" :key="index" v-model="data.sign[index]" @change="onCheckBoxInput">
                </div>
            </div>
            <div>
                <p>指数</p>
                <div class="checkbox-list">
                    <input type="checkbox" class="checkbox-item" v-for="(c, index) in data.exponent" :key="index" v-model="data.exponent[index]" @change="onCheckBoxInput">
                </div>
            </div>
            <div>
                <p>尾数</p>
                <div class="checkbox-list">
                    <input type="checkbox" class="checkbox-item" v-for="(c, index) in data.mantissa" :key="index" v-model="data.mantissa[index]" @change="onCheckBoxInput">
                </div>
            </div>
        </div>
        <div>
            <div class="input-container">
                <p>十进制</p>
                <input type="text" v-model="literal" @change="onDecimalInput"/>
            </div>
            <div class="input-container">
                <p>值表示</p>
                <input type="text" :value="binary32Rep" readonly/>
            </div>
        </div>
    </div>
</template>

<script>
function binary32Rep(floatNumber) {
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setFloat32(0, floatNumber);
    let intRepresentation = view.getUint32(0);
    let binaryString = intRepresentation.toString(2).padStart(32, '0');
    return binaryString;
}

function string_to_bool_array(str) {
    return str.split('').map((c) => c === '1');
}

function normFloat32(floatNumber) {
    let farray = new Float32Array(1);
    farray[0] = floatNumber;
    return farray[0];
}

function floatToLeastLenString(floatNumber) {
    let str = floatNumber.toString();

    let dotIndex = str.indexOf('.');
    if (dotIndex === -1) {
        return str;
    }

    let decimalLen = str.length - dotIndex - 1;
    while(decimalLen > 0) {
        let nstr = floatNumber.toFixed(decimalLen);
        if (normFloat32(parseFloat(nstr)) === floatNumber) {
            decimalLen -= 1;
            str = nstr;
        }
        else break;
    }
    return str;
}

function floatToBinary32(floatNumber) {
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setFloat32(0, floatNumber);
    let intRepresentation = view.getUint32(0);
    let binaryString = intRepresentation.toString(2).padStart(32, '0');

    return {
        value : floatNumber,
        sign: string_to_bool_array(binaryString[0]),
        exponent: string_to_bool_array(binaryString.slice(1, 9)),
        mantissa: string_to_bool_array(binaryString.slice(9))
    }
}

function binary32ToFloat(sign, exponent, mantissa){
    let binaryString = sign.concat(exponent, mantissa).map((b) => b ? '1' : '0').join('');
    let intRepresentation = parseInt(binaryString, 2);
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setUint32(0, intRepresentation);
    return view.getFloat32(0);
}

// qNaN as default
const default_data = floatToBinary32(0);

export default {
    props: {},
    data() {
        return {
            testV:false,
            literal: '',
            data: Object.assign({}, default_data),
            decimal: '',
            binrep: binary32Rep(default_data.value),
        };
    }, 
    computed: {
        binary32Rep() {
            return binary32Rep(this.data.value);
        }
    },
    methods: {
        updateDisplay() {
            this.float32display = floatToLeastLenString(this.data.value);
        },
        onDecimalInput() {
            let p = parseFloat(this.literal);
            let f32 = normFloat32(p);

            this.data = floatToBinary32(f32);
        },
        onCheckBoxInput() {
            this.data.value = binary32ToFloat(this.data.sign, this.data.exponent, this.data.mantissa);
            this.literal = floatToLeastLenString(this.data.value);
        }
    }
}

</script>

<style scoped>
.b32display {
    display:block;
    background: var(--code-bg-color);
    border-radius: 6px;
    padding: 10px;
}

.pheader {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.pheader p {
    font-weight: bold;
    margin: 10px;
}

.container {
    display: flex;
    flex-direction: row;
}
.container div {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container p {
    width: 40px;
    text-align: center;
    margin: 0;
}
.container .checkbox-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
}

@media (min-width: 768px) {
    .container div {
        margin-left: 5px;
        margin-right: 5px;
    }
}

@media (max-width: 768px) {
    .container div {
        margin-left: 1px;
        margin-right: 1px;
    }
}

.input-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
}

.input-container p {
    margin: 0;
    width: 20%;
    text-align: center;
}

@media (min-width: 768px) {
    .input-container p {
        margin-left: 10px;
        margin-right: 10px;
    }
}

@media (max-width: 768px) {
    .input-container p {
        margin-left: 3px;
        margin-right: 3px;
    }
}

.input-container input {
    width: 70%;
}
</style>