<template>
  <div class="allergies-page">
    <h1>Allergen Information</h1>
    
    <div class="intro">
      <p>From the new legislative regulations and decree of the Ministry of the Interior of the Slovak Republic and the Ministry of Health of the Slovak Republic no. 1187/2004, catering establishments are obliged to indicate the presence of allergens put into circulation for the final consumer.</p>
      
      <p>In accordance with the above instructions, the allergens found in the food are marked with a number in the menu, according to the following list:</p>
    </div>

    <ol class="allergen-list">
      <li>Cereals containing gluten (ie wheat, rye, barley, oats, spelled, kamut or their hybrid varieties).</li>
      <li>Crustaceans and their products.</li>
      <li>Eggs and egg products.</li>
      <li>Fish and fish products.</li>
      <li>Peanuts and their products.</li>
      <li>Soybeans and their products.</li>
      <li>Milk and milk products.</li>
      <li>Nuts being almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, macadamia nuts and Queensland nuts and products thereof.</li>
      <li>Celery and its products.</li>
      <li>Mustard and its products.</li>
      <li>Sesame seeds and their products.</li>
      <li>Sulfur dioxide and sulphites in concentrations higher than 10 mg/kg or 10 mg/l.</li>
      <li>Lupine and its products.</li>
      <li>Molluscs and their products.</li>
    </ol>
  </div>
</template>

<style scoped>
.allergies-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.intro {
  margin-bottom: 30px;
}

.allergen-list {
  padding-left: 20px;
}

.allergen-list li {
  margin-bottom: 10px;
  line-height: 1.4;
}
</style>
