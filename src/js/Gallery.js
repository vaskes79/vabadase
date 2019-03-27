class Gallery {
  constructor(
    gItemsLinks = '.gallery-items__link',
    gViewBox = '.gallery-items__img-view'
  ) {
    this.items = document.querySelectorAll(gItemsLinks);
    this.viewBox = document.querySelector(gViewBox);
    this.wrapItemsClassName = 'gallery-items__wrap-items';
    this.dataItems = [];
  }
  createItems() {
    let {items, createImgItem, viewBox, dataItems, wrapItemsClassName} = this;
    // 1. create array
    dataItems = [].map.call(items, item => {
      const {
        href: src,
        dataset: {allt, index, description},
      } = item;
      return {
        src,
        allt,
        index,
        description,
      };
    });
    // 2. create elemen wrapItems
    let wrapItems = document.createElement('div');
    wrapItems.className = wrapItemsClassName;
    // 3. create elements imgItems and add to this.wrapItems
    dataItems.forEach(item => {
      wrapItems.appendChild(createImgItem(item));
    });
    // 4. get container items link and add this.wrapItems
    viewBox.appendChild(wrapItems);
    // update this
    this.wrapItems = document.querySelector('.' + wrapItemsClassName);
    this.dataItems = dataItems;
    // 5. set
    this.endPos = dataItems.length - 1;
    // 6. set
    this.startPos = 0;
    console.log(this);
  }

  createImgItem({src, allt, index, description}) {
    const imgItem = document.createElement('img');
    imgItem.src = src;
    imgItem.setAttribute('className', 'galley-items__img-show');
    imgItem.setAttribute('allt', allt);
    imgItem.dataset['index'] = index;
    imgItem.dataset['description'] = description;
    return imgItem;
  }

  init() {
    this.createItems();
  }
}

export default Gallery;
