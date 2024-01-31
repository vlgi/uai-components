<script lang="ts">
  import Input from "../../formFields/Input/Input.svelte";
  import CleaveInput from "../../formFields/CleaveInput/CleaveInput.svelte";
  import Textarea from "../../formFields/Textarea/Textarea.svelte";
  import Select from "../../formFields/Select/Select.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import ListRadioButton from "../../formFields/ListRadioButton/ListRadioButton.svelte";
  import ListCheckbox from "../../formFields/ListCheckbox/ListCheckbox.svelte";
  import Checkbox from "../../formFields/ListCheckbox/Checkbox/Checkbox.svelte";
  import Form from "../Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;

  const simpleDessertsOptions = [
    { text: "Torta alemã" },
    { text: "Pavê" },
    { text: "Bolo" },
    { text: "Brigadeiro" },
    { text: "Pudim" },
    { text: "Rabanada" },
    { text: "Beijinho" },
  ];

  const listOptions = [
    {
      value: "strawberry",
      label: "Morango",
    },
    {
      value: "chocolate",
      label: "Chocolate",
    },
    {
      value: "carrot",
      label: "Cenoura",
    },
  ];

  const drinkOptions = [
    {
      value: "juice",
      label: "Suco",
    },
    {
      value: "soda",
      label: "Refrigerante",
    },
    {
      value: "water",
      label: "Agua",
    },
  ];

  const languageOptions = [
    {
      value: "portuguese",
      label: "Português",
    },
    {
      value: "english",
      label: "Ingles",
    },
    {
      value: "spanish",
      label: "Espanhol",
    },
  ];

  function validateEmail(value: string): string | boolean {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) return true;
    return "Type a valid e-mail.";
  }

  function validatePassword(value: string): string | boolean {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)) {
      return true;
    }
    return "So weak! You can do it better.";
  }

  function min10Characters(value: string): string | boolean {
    if (value.length >= 10) return true;
    return "Minimum 10 characters";
  }
</script>

<p>This form use our real components, and shows an example using all possible form fields.</p>
<br />
<hr />
<br />

<Form
  bind:values
  bind:isAllValid
  on:submit
  id="my-unique-form"
>
  <Input
    label="email"
    name="email"
    type="email"
    validationFn={validateEmail}
    required={true}
    value="test@example.com"
  />
  <Input
    label="password"
    name="password"
    type="password"
    validationFn={validatePassword}
    required={true}
    value="A99@123s"
  />
  <CleaveInput
    label="Dinheiro"
    name="money"
    required={true}
    cleaveOptions={{
      prefix: "R$ ",
      numeral: true,
      delimiter: ".",
      noImmediatePrefix: true,
      numeralDecimalMark: ",",
      rawValueTrimPrefix: true,
    }}
    value="10"
  />
  <Textarea
    label="Notes"
    name="notes"
    required={true}
    validationFn={min10Characters}
    value="Que senha fraca"
  />
  <Select
    label="Favorite Dessert"
    id="favorite-desserts"
    name="favorite-desserts"
    options={simpleDessertsOptions}
    required={true}
    disabled={true}
    selected={{ text: "Pavê" }}
  />
  <Select
    label="Disliked Dessert"
    id="disliked-desserts"
    name="disliked-desserts"
    multiple={true}
    min={2}
    options={simpleDessertsOptions}
    required={true}
    selected={[{ text: "Rabanada" }, { text: "Beijinho" }]}
  />
  <ListRadioButton
    name="which-cake"
    radioOptions={listOptions}
    listName="Qual bolo você prefere?"
    radioStyleType="notFilled"
    required={true}
    value="chocolate"
  />
  <br />
  <ListCheckbox
    name="liked-cakes"
    checkboxItems={listOptions}
    title="Quais bolos você gosta?"
    required={true}
    values={["carrot", "chocolate", "strawberry"]}
  />
  <Checkbox
    name="sold-your-soul"
    label="Declaro que li e concordo com os termos de uso"
    required={true}
    --uai-checkbox-margin="1rem 0 0"
    checked={true}
  />
  <Checkbox
    name="strawberry/chocolate"
    styleType="text-switch"
    uncheckedText="Morango"
    checkedText="Chocolate"
    checked={true}
    --uai-checkbox-margin="1rem 0 0.25rem"
    --uai-checkbox-switch-width="8.275rem"
  />
  <Checkbox
    name="save-my-choices"
    label="salvar minhas escolhas"
    styleType="switch"
    required={true}
    --uai-checkbox-margin="1rem 0 1rem"
    checked={true}
  />
  <ListCheckbox
    name="liked-drinks"
    checkboxItems={drinkOptions}
    title="Quais drinks você gosta?"
    styleType="badge-pill"
    iconPosition="right"
    direction="row"
    required={true}
    values={["juice", "soda"]}
    --uai-checkbox-badge-pill-background="#87cefa"
  />
  <br />
  <ListRadioButton
    name="which-language"
    radioOptions={languageOptions}
    listName="Qual sua lingua nativa"
    radioStyleType="badge-pill"
    direction="row"
    required={true}
    value="portuguese"
    --uai-radio-badge-pill-background-color="#87cefa"
  />
  <Button type="submit">Submit</Button>
</Form>

<div>
  <br />
  <hr />
  <br />
  <br />
  <p><b>Form Values:</b> {JSON.stringify(values)}</p>
  <p><b>Form valid:</b> {isAllValid}</p>
</div>
