// datos
const goldMedals = [
    {team: 'JOR', medal: 'Gold', total: 1},
    {team: 'GBR', medal: 'Gold', total: 64},
    {team: 'USA', medal: 'Gold', total: 139},
    {team: 'JOR', medal: 'Silver', total: 55},
    {team: 'GBR', medal: 'Silver', total: 28},
    {team: 'USA', medal: 'Silver', total: 25},
    {team: 'JOR', medal: 'Bronze', total: 24},
    {team: 'GBR', medal: 'Bronze', total: 10},
    {team: 'USA', medal: 'Bronze', total: 4}
  ]
  
  // Resultados parciales / temporales
  const countryResults = {};
  
  // Calculamos totales
  [
    ...goldMedals
  ].map(result => {
      const partialResult = countryResults[result.team];
      countryResults[result.team] = partialResult ? partialResult + result.total : result.total;
  });

  // Pasamos los resultados al formato array indicado
const totals = Object
.keys(countryResults)
.map(totalResult => (
  {
      team: totalResult,
      totalMedals: countryResults[totalResult]
  }
)
);

// Mostramos por consola
console.log(totals);