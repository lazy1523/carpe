<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { InitType, addAccount } from '../../modules/accountActions'

  let danger_temp_private_key: string

  const initAccount = (pri_key: string) => {
    addAccount(InitType.PriKey, pri_key.trim())
  }
</script>

<main>
  <div class="uk-margin">
    <p>{$_('wallet.account_from_private.description')}</p>
    <form id="account-form">
      <fieldset class="uk-fieldset">
        <div class="uk-margin uk-inline-block uk-width-1-1">
          <input
            class="uk-input"
            type="text"
            placeholder={$_('wallet.account_from_private.placeholder')}
            bind:value={danger_temp_private_key}
          />
        </div>
      </fieldset>
    </form>

    <button
      class="uk-button uk-button-primary"
      type="button"
      on:click|preventDefault={initAccount(danger_temp_private_key)}
    >
      Submit Now
    </button>
  </div>
</main>
