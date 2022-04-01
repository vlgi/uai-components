<script lang="ts">
  import Input from "../formFields/Input/Input.svelte";
  import Textarea from "../formFields/Textarea/Textarea.svelte";
  import Select from "../formFields/Select/Select.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import ListCheckbox from "../formFields/ListCheckbox/ListCheckbox.svelte";
  import Checkbox from "../formFields/ListCheckbox/Checkbox/Checkbox.svelte";
  import Form from "./Form.svelte";

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

  // Exemplo será alterado
  const checkboxItems = [
    {
      value: "strawberry",
      label: "Morango",
      checked: true,
    },
    {
      value: "chocolate",
      label: "Chocolate",
      checked: true,
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

  function validatePassword(value: string): string|boolean {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)) return true;
    return "So weak! You can do it better.";
  }

  function min10Characters(value: string): string|boolean {
    if (value.length >= 10) return true;
    return "Minimum 10 characters";
  }
</script>

<div>
  <h1>Real Form Usage Example</h1>
  <p>
    This form use our real components,
    and shows an example using all possible form fields
  </p>
  <br><hr><br>
</div>

<div class="my-form">
  <Form bind:values bind:isAllValid on:submit>
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
    <ListCheckbox
      name="which-cake"
      {checkboxItems}
      listName="Quais bolos você gosta?"
      required={true}
      min={2}
    />

    <Checkbox
      name="sold-your-soul"
      label="Declaro que li e concordo com os termos de uso"
      value={true}
    />
    <Button type="submit">Submit</Button>
  </Form>
</div>

<div>
  <br><hr><br>
  <p><b>Form Values:</b> { JSON.stringify(values) }</p>
  <p><b>Form valid:</b> { isAllValid }</p>
</div>
