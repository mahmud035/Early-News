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

  const newsCardContainer = document.getElementById('news-card-container');
  newsCardContainer.textContent = '';

  sortedArray.forEach((news) => {
    const {
      _id,
      thumbnail_url,
      title,
      details,
      author: { img, published_date },
    } = news;
    console.log(news);

    const newsCard = document.createElement('div');
    newsCard.classList.add(
      'card',
      'mb-3',
      'p-3',
      'border-0',
      'rounded',
      'shadow-sm'
    );
    newsCard.innerHTML = `
        <div class="row gx-3">
          <div class="col-md-4">
            <img
              src="${thumbnail_url}"
              class="img-fluid rounded h-100"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text text-muted ">
                    ${
                      details.length > 100
                        ? details.slice(0, 100) + '...'
                        : details
                    }
                </p>

               <div class="card-others-info">
                 <div class="author-info">
                    <img src="${img}" alt="" />
                   <div>
                     <p class="mb-0">${
                       news?.author?.name ? news.author.name : 'Not Available'
                     }</p>
                     <p class="mb-0">${getDate(published_date)}</p>
                   </div>
                 </div>
                 <div class="view-total">
                   <i class="fa-solid fa-eye"></i>
                   <span>${
                     news?.total_view ? news.total_view : 'Not Available'
                   }</span>
                 </div>
                 <div class="rating">
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-solid fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                   <i class="fa-regular fa-star"></i>
                 </div>
                 <div class="see-more">
                   <i class="fa-solid fa-arrow-right"></i>
                 </div>
              </div>
            </div>
          </div>
        </div>
    `;

    newsCardContainer.appendChild(newsCard);
  });
};

const getDate = (published_date) => {
  const date = new Date(published_date);
  const sortDate = date.toString().slice(4, 15);
  return sortDate;
};
