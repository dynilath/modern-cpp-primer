<template>
    <div class="container">
      <div class="input-group">
        <label for="decimal">十进制:</label>
        <input type="text" v-model="decimal" @input="onDecimalInput" />
      </div>
      <div class="input-group">
        <label for="octal">八进制:</label>
        <input type="text" v-model="octal" @input="onOctalInput" />
      </div>
      <div class="input-group">
        <label for="hexadecimal">十六进制:</label>
        <input type="text" v-model="hexadecimal" @input="onHexadecimalInput" />
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      decimal: '',
      octal: '',
      hexadecimal: ''
    };
  },
  methods: {
    onDecimalInput() {
      const decimalValue = parseInt(this.decimal, 10);
      if (!isNaN(decimalValue)) {
        this.octal = decimalValue.toString(8);
        this.hexadecimal = decimalValue.toString(16).toUpperCase();
      } else {
        this.octal = '';
        this.hexadecimal = '';
      }
    },
    onOctalInput() {
      const octalValue = parseInt(this.octal, 8);
      if (!isNaN(octalValue)) {
        this.decimal = octalValue.toString(10);
        this.hexadecimal = octalValue.toString(16).toUpperCase();
      } else {
        this.decimal = '';
        this.hexadecimal = '';
      }
    },
    onHexadecimalInput() {
      const hexadecimalValue = parseInt(this.hexadecimal, 16);
      if (!isNaN(hexadecimalValue)) {
        this.decimal = hexadecimalValue.toString(10);
        this.octal = hexadecimalValue.toString(8);
      } else {
        this.decimal = '';
        this.octal = '';
      }
    }
  }
};
</script>
  
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-bottom: 10px;
  border-radius: 0.3rem;
  border: 1px solid var(--text-color);
  display: inline;

  width: 150px;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    width: 100%;
    max-width: 450px;
  }
}
</style>