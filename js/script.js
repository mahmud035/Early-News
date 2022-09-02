'use strict';

const loadAllCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
  } catch (error) {
    console.log(error.message);
  }
};

const displayAllCategories = async () => {
  const allCategories = await loadAllCategory();

  const categoryContainer = document.getElementById('category-container');

  allCategories.forEach((category) => {
    console.log(category);

    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = category.category_name;

    categoryContainer.appendChild(categoryItem);
  });
};

displayAllCategories();
