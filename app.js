const loadAI = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const tools = data.data;
  console.log(tools);
};

loadAI();
