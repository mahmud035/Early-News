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

const displayAllCategories = async (e) => {
  const allCategories = await loadAllCategory();
  const categorySection = document.getElementById('category-section');

  allCategories.forEach((category) => {
    // console.log(category);
    const categoryContainer = document.createElement('div');

    categoryContainer.innerHTML = `
    <li class="item" onclick="loadEachCategory('${category.category_id}')"> ${category.category_name} </li>`;

    categorySection.appendChild(categoryContainer);
  });
};

displayAllCategories();

const loadEachCategory = async (id) => {
  try {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayEachCategory(data.data);
  } catch (error) {
    console.log(error.message);
  }
};

const displayEachCategory = async (data) => {
  //* sort the array of objects by the total_view values
  const sortedArray = data.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  // console.log(sortedArray);

  sortedArray.forEach((news) => {
    console.log(news);
  });
};
