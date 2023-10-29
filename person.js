import { reactive, html, watch } from 'https://esm.sh/@arrow-js/core';
const appElement = document.getElementById('persons');

const persons = [
  {
    id: 1,
    name: 'sana',
  },
  {
    id: 2,
    name: 'mina',
  },
  {
    id: 3,
    name: 'jihyo',
  },
];

const data = reactive({
  persons: persons,
  search: '',
});

function addButton() {
  const input = document.getElementById('add-person');

  persons.push({
    id: data.persons.length + 1,
    name: input.value,
  });
  input.value = '';

  data.persons = persons;
}

function search() {
  if (data.search == '') {
    data.persons = persons;
  } else {
    data.persons = persons;
    data.persons = data.persons.filter((person) => {
      return person.name.startsWith(data.search);
    });
  }
}

watch(search);

function searchButton() {
  const input = document.getElementById('search-person');

  data.search = input.value;
}

const title = html`<div class="text-center text-xl font-semibold">
  List Person
</div>`;

const addForm = html`<div class="m-2 items-center">
  <input
    type="text"
    placeholder="add"
    id="add-person"
    class="border-2 rounded px-2 py-1"
  />
  <button
    class="bg-blue-500 rounded px-2 py-1 text-white"
    @click="${addButton}"
  >
    Add
  </button>
</div>`;

const searchForm = html`<div class="m-2 items-center">
  <input
    type="text"
    placeholder="Search"
    id="search-person"
    class="border-2 rounded px-2 py-1"
  />
  <button
    class="bg-blue-500 rounded px-2 py-1 text-white"
    @click="${searchButton}"
  >
    Search
  </button>
</div>`;

const template = html`${() => title} ${() => searchForm}
  <div class="grid grid-cols-3 gap-2">
    ${() =>
      data.persons.map((person) =>
        html`<div class="px-2 py-4 m-2 bg-blue-500 text-white rounded">
          ${person.name}
        </div>`.key(person.id)
      )}
  </div>
  ${() => addForm}`;

template(appElement);
