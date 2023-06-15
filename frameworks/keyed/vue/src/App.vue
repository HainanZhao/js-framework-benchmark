<script setup>
import { ref, shallowRef } from 'vue'
import { buildData } from './data'

const selected = ref()
const rows = shallowRef([])

function setRows(update = rows.value.slice()) {
  rows.value = update
}

function add() {
  rows.value = rows.value.concat(buildData(1000))
}

function remove(id) {
  rows.value.splice(
    rows.value.findIndex((d) => d.id === id),
    1
  )
  setRows()
}

function select(id) {
  selected.value = id
}

function run() {
  setRows(buildData())
  selected.value = undefined
}

function update() {
  const _rows = rows.value
  for (let i = 0; i < _rows.length; i += 10) {
    _rows[i].label += ' !!!'
  }
  setRows()
}

function runLots() {
  setRows(buildData(10000))
  selected.value = undefined
}

function clear() {
  setRows([])
  selected.value = undefined
}

function swapRows() {
  const _rows = rows.value
  if (_rows.length > 998) {
    const d1 = _rows[1]
    const d998 = _rows[998]
    _rows[1] = d998
    _rows[998] = d1
    setRows()
  }
}

function handleAction() {
  console.log('action');
}
</script>

<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>Vue.js 3 (keyed)</h1>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="run"
              @click="run"
            >
              Create 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="runlots"
              @click="runLots"
            >
              Create 10,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="add"
              @click="add"
            >
              Append 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="update"
              @click="update"
            >
              Update every 10th row
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="clear"
              @click="clear"
            >
              Clear
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="swaprows"
              @click="swapRows"
            >
              Swap Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover table-striped test-data">
    <tbody>
      <tr
        v-for="{ id, label } of rows"
        :key="id"
        :class="{ danger: id === selected }"
        :data-label="label"
        v-memo="[label, id === selected]"
      >
        <td class="col-md-1">{{ id }}</td>
        <td class="col-md-4">
          <a @click="select(id)">{{ label }}</a>
        </td>
        <td class="col-md-1">
          <a @click="remove(id)">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
        </td>
        <td class="col-md-6">
          <div v-for="i in 3" :key="i">
            <div class="deep-nested-node-level-1">
                <div class="deep-nested-node-level-2">
                  <div class="deep-nested-node-level-3">
                      <div class="deep-nested-node-level-4">
                          <div class="deep-nested-node-level-5">
                            <p v-if="(id+i) % 9 === 1">label</p>
                            <input v-if="(id+i) % 9 === 2" type="text" placeholder="text input" @click="handleAction"/>
                            <input v-if="(id+i) % 9 === 3" type="button" value="input button" @click="handleAction"/>
                            <input v-if="(id+i) % 9 === 4" type="checkbox" value="checkbox" @click="handleAction"/>
                            <input v-if="(id+i) % 9 === 5" type="color" value="red" @click="handleAction"/>
                            <input v-if="(id+i) % 9 === 6" type="date" value="date" @click="handleAction"/>
                            <input v-if="(id+i) % 9 === 7" type="email" value="abc@test.com" @click="handleAction"/>
                            <button v-if="(id+i) % 9 === 8" @click="handleAction">button button</button>
                            <select v-if="(id+i) % 9 === 0" @select="handleAction"><option>1</option><option>2</option></select>
                          </div>
                        </div>
                    </div>
                </div>
            </div>               
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <span
    class="preloadicon glyphicon glyphicon-remove"
    aria-hidden="true"
  ></span>
</template>
