<template>
      <div>
          <h1 class="title">Editar ementa</h1>
          <div class="boxBorder" style="padding: 15px">
              <b-field label="Escolha a data">
        <b-datepicker
            placeholder="Escolha a data"
            icon="calendar-today">
        </b-datepicker>
    </b-field>
      <b-field label="Prato de carne">
            <b-input placeholder="Prato de carne"></b-input>
        </b-field>
        <b-field label="Prato de peixe">
            <b-input placeholder="Prato de peixe" style=" position: relative; right: 0px;"></b-input>
        </b-field>
        <b-field label="Prato vegetariano">
            <b-input placeholder="Prato vegetariano"></b-input>
        </b-field>
        <b-field label="Prato de dieta">
            <b-input placeholder="Prato de dieta"></b-input>
        </b-field>
        <a class="button is-danger">Cancelar</a>
        <a class="button is-link">Confirmar</a>
</div>
</div>
</template>

<script>
</script>

<style lang="css">
    .boxBorder {
        margin-right: 15px;
        margin-left: 15px;
        border: solid 0.05px;
        border-color: #e5e5e5;
        box-shadow: 3px 3px 5px #d1d1d1;
        border-radius: 5px;
        background-color: #fff;
    }

    .title {
        font-size: 28px;
        font-weight: bold;
    }
</style>
