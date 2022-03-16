export function fetchTabs() {
  // return fetch('http://json.ffwagency.md/tabs')
  //   .then((response) => response.json());

  return (new Promise((resolve, reject) => {
    resolve(
      [
        {
          "id": 101,
          "label": "My Fonts",
          "content_endpoint": "fonts_a"
        },
        {
          "id": 102,
          "label": "Buy Fonts",
          "content_endpoint": "fonts_b"
        }
      ]
    );
  }));
}

export function fetchTabData(tabId) {
  return fetch(`http://json.ffwagency.md/${tabId}`)
    .then((response) => response.json());
}
