<script lang="ts">
  import Input from "../formFields/Input/Input.svelte";
  import CleaveInput from "../formFields/CleaveInput/CleaveInput.svelte";
  import Textarea from "../formFields/Textarea/Textarea.svelte";
  import Select from "../formFields/Select/Select.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import ListRadioButton from "../formFields/ListRadioButton/ListRadioButton.svelte";
  import ListCheckbox from "../formFields/ListCheckbox/ListCheckbox.svelte";
  import Checkbox from "../formFields/ListCheckbox/Checkbox/Checkbox.svelte";
  import Form from "./Form.svelte";

  export let values: Record<string, unknown>;
  export let valuesFromCookies: string;
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

  function validateEmail(value: string): string | boolean {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) return true;
    return "Type a valid e-mail.";
  }

  function validatePassword(value: string): string | boolean {
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
        value,
      )
    ) {
      return true;
    }
    return "So weak! You can do it better.";
  }

  function min10Characters(value: string): string | boolean {
    if (value.length >= 10) return true;
    return "Minimum 10 characters";
  }

  function resetFormCookies() {
    localStorage.removeItem("my-form-cookie-key");
    valuesFromCookies = localStorage.getItem("my-form-cookie-key");
  }

  //  if values change, show value defined in cookie just for test
  $: if (values) valuesFromCookies = localStorage.getItem("my-form-cookie-key");
</script>

<div>
  <h1>Real Form Usage Example</h1>
  <p>
    This form use our real components, and shows an example using all possible
    form fields, with auto save on cookies enabled.
  </p>
  <br />
  <hr />
  <br />
</div>

<div class="my-form">
  <Form bind:values bind:isAllValid on:submit saveOnStorage={true} storageKey="my-form-cookie-key">
    <Input
      label="email"
      name="email"
      type="email"
      validationFn={validateEmail}
      required={true}
    />
    <Input
      label="password"
      name="password"
      type="password"
      validationFn={validatePassword}
      required={true}
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
    />
    <Textarea
      label="Notes"
      name="notes"
      required={true}
      validationFn={min10Characters}
    />
    <Select
      label="Favorite Dessert"
      id="favorite-desserts"
      name="favorite-desserts"
      options={simpleDessertsOptions}
      required={true}
    />
    <Select
      label="Disliked Dessert"
      id="disliked-desserts"
      name="disliked-desserts"
      multiple={true}
      min={2}
      options={simpleDessertsOptions}
      required={true}
    />
    <ListRadioButton
      name="which-cake"
      radioOptions={listOptions}
      listName="Qual bolo você prefere?"
      radioStyleType="notFilled"
      required={true}
    />
    <br />
    <ListCheckbox
      name="liked-cakes"
      checkboxItems={listOptions}
      title="Quais bolos você gosta?"
      required={true}
    />
    <Checkbox
      name="sold-your-soul"
      label="Declaro que li e concordo com os termos de uso"
      required={true}
      --szot-checkbox-margin="1rem 0 0"
    />
    <Button type="submit">Submit</Button>
  </Form>
</div>

<div>
  <br />
  <hr />
  <br />
  <Button buttonStyle="dark" on:click={resetFormCookies}>Reset store</Button>
  <br />
  <p><b>Form Values:</b> {JSON.stringify(values)}</p>
  <p><b>Form Cookies:</b> {valuesFromCookies}</p>
  <p><b>Form valid:</b> {isAllValid}</p>
</div>
