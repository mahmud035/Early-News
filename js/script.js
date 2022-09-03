'use strict';

const toggleSpinner = (displayValue) => {
  document.getElementById('spinner').style.display = displayValue;
};

const loadAllCategory = async () => {
  try {
    // display spinner
    toggleSpinner('block');

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
  const categorySection = document.getElementById('category-section');

  allCategories.forEach((category) => {
    // console.log(category);
    const categoryContainer = document.createElement('div');

    categoryContainer.innerHTML = `
    <li class="item" onclick="loadEachCategory('${category.category_id}', '${category.category_name}')"> ${category.category_name} </li>`;

    categorySection.appendChild(categoryContainer);
  });

  // Hide Spinner
  toggleSpinner('none');
};

displayAllCategories();

const loadEachCategory = async (id, name) => {
  try {
    // display spinner
    toggleSpinner('block');

    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(name);
    displayEachCategory(data.data, name);
  } catch (error) {
    console.log(error.message);
  }
};

const displayEachCategory = async (data, name) => {
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
    // console.log(news);

    const newsCard = document.createElement('div');
    newsCard.classList.add(
      'card',
      'mb-3',
      'p-3',
      'border-0',
      'rounded',
      'shadow-sm',
      'w-100'
    );
    newsCard.innerHTML = `
        <div class="row gx-3">
          <div class="col-md-4 col-lg-3 col-xxl-2">
            <img
              src="${thumbnail_url}"
              class="img-fluid rounded  category-card-img"
              alt="..."
            />
          </div>
          <div class="col-md-8 col-lg-9 col-xxl-10">
            <div class="card-body pb-0 d-flex flex-column justify-content-between h-100">
                <h5 class="card-title">${title}</h5>
                <p class="card-text text-muted ">
                    ${
                      details.length > 300
                        ? details.slice(0, 300) + '...'
                        : details
                    }
                </p>

               <div class="card-others-info">
                 <div class="author-info">
                    <img src="${img}" alt="" />
                   <div>
                     <p class="mb-0 fw-semibold">${
                       news?.author?.name ? news.author.name : 'Not Available'
                     }</p>
                     <p class="mb-0 text-muted">${getDate(published_date)}</p>
                   </div>
                 </div>
                 <div class="view-total">
                   <i class="fa-solid fa-eye"></i>
                   <span class="ps-1">${
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
                   <i class="fa-solid fa-arrow-right-long see-details"  data-bs-toggle="modal"  data-bs-target="#exampleModal"
                   onclick="loadNewsDetails('${_id}')"></i>
                 </div>
              </div>
            </div>
          </div>
        </div>
    `;

    newsCardContainer.appendChild(newsCard);
  });
  categoryResultFound(data, name); //* check how many result found

  // Hide Spinner
  toggleSpinner('none');
};

const getDate = (published_date) => {
  const date = new Date(published_date);
  const sortDate = date.toString().slice(4, 15);
  return sortDate;
};

const categoryResultFound = (data, name) => {
  const resultFoundDiv = document.getElementById('category-result-found');
  const text = document.createElement('h6');
  text.classList.add('mb-0');

  const resultCount = data.length;
  console.log(resultCount);

  console.log(data, name);

  if (resultCount > 0) {
    resultFoundDiv.textContent = '';
    text.innerHTML = `<span>${resultCount}</span> results for category <span>"${name}"</span>`;

    resultFoundDiv.appendChild(text);
  } else {
    resultFoundDiv.textContent = '';
    text.innerHTML = `Sorry, we couldn't find any results`;

    resultFoundDiv.appendChild(text);
  }
};

const loadNewsDetails = async (id) => {
  try {
    // display spinner
    toggleSpinner('block');

    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data[0]);
    displayNewsDetails(data.data[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const displayNewsDetails = async (news) => {
  const {
    image_url,
    title,
    details,
    author: { img, published_date },
  } = news;

  console.log(news);

  const newsTitle = document.getElementById('news-title');
  newsTitle.innerText = title;

  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = '';

  const newsCard = document.createElement('div');
  newsCard.classList.add(
    'card',
    'mb-3',
    'p-3',
    'border-0',
    'rounded',
    'shadow-sm',
    'news-details-card',
    'mx-auto'
  );
  newsCard.innerHTML = `
         <img src="${image_url}" class="card-img-top " alt="..." />
         <div class="card-body pb-0">
              <h5 class="card-title py-3">${title}</h5>
              <p class="card-text text-muted">
                ${
                  details.length > 3000
                    ? details.slice(0, 3000) + '...'
                    : details
                }
              </p>

              <div class="card-others-info">
                <div class="author-info">
                  <img src="${img}" alt="" />
                  <div>
                    <p class="mb-0 fw-semibold">
                      ${news?.author?.name ? news.author.name : 'Not Available'}
                    </p>
                    <p class="mb-0 text-muted">${getDate(published_date)}</p>
                  </div>
                </div>
              <div class="view-total">
                  <i class="fa-solid fa-eye"></i>
                  <span class="ps-1"
                    >${
                      news?.total_view ? news.total_view : 'Not Available'
                    }</span
                  >
              </div>
              <div class="-modal-rating">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
              </div>
           </div>
         </div>
    `;
  modalBody.appendChild(newsCard);

  // Hide Spinner
  toggleSpinner('none');
};
