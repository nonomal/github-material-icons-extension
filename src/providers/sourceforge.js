const sourceforgeConfig = {
  name: 'sourceforge',
  selectors: {
    // File list row, README header, file view header
    row: 'table#files_list tr, #content_base tr td:first-child',
    // File name table cell, file view header
    filename: 'th, a.icon',
    // The iconfont icon not including the delete button icon in the file view header
    icon: 'a:not(.icon), i.fa',
  },
  getIsLightTheme: () => true, // There appears to be no dark theme available for gitee.
  getIsDirectory: ({ row, icon }) => {
    if (icon.nodeName === 'I') {
      return icon.classList.contains('fa-folder');
    }

    return row.classList.contains('folder');
  },
  getIsSubmodule: () => false,
  getIsSymlink: ({ icon }) => {
    if (icon.nodeName === 'I') {
      return icon.classList.contains('fa-star');
    }

    return false;
  },
  replaceIcon: (iconOrAnchor, newSVG) => {
    newSVG.style.verticalAlign = 'text-bottom';

    if (iconOrAnchor.nodeName === 'I') {
      newSVG.style.height = '14px';
      newSVG.style.width = '14px';

      iconOrAnchor.parentNode.replaceChild(newSVG, iconOrAnchor);
    }
    // For the files list, use the anchor element instead of the icon because in some cases there is no icon
    else {
      if (iconOrAnchor.querySelector('img')) {
        // only replace/prepend the icon once
        return;
      }

      newSVG.style.height = '20px';
      newSVG.style.width = '20px';

      const svgEl = iconOrAnchor.querySelector('svg');

      if (svgEl) {
        svgEl.parentNode.replaceChild(newSVG, svgEl);
      } else {
        iconOrAnchor.prepend(newSVG);
      }
    }
  },
  onAdd: () => {},
};

export default sourceforgeConfig;