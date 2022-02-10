<script lang="ts">
  import Input from "../formFields/Input/Input.svelte";
  import Textarea from "../formFields/Textarea/Textarea.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import Form from "./Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;

  function validateEmail(value: string): string|boolean {
    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)) return true;
    return "Type a valid e-mail.";
  }

  function validatePassword(value: string): string|boolean {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)) return true;
    return "So weak! You can do it better.";
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
    />
    <Button type="submit" size="small">Submit</Button>
  </Form>
</div>

<div>
  <br><hr><br>
  <p><b>Form Values:</b> { JSON.stringify(values) }</p>
  <p><b>Form valid:</b> { isAllValid }</p>
</div>
