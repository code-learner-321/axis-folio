/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/axis-folio/edit.js"
/*!********************************!*\
  !*** ./src/axis-folio/edit.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    uniqueId,
    items = [],
    columnsDesktop,
    columnsTablet,
    columnsMobile,
    gridGap,
    borderRadius,
    hasShadow,
    cardBgColor,
    hCardBgColor,
    titleColor,
    descColor,
    tagBgColor,
    tagTextColor,
    tagFontSize,
    showTags,
    enableLoadMore,
    postsPerPage,
    loadMoreText,
    btnBgColor,
    btnTextColor,
    hasZoom,
    zoomScale,
    // Shadow attributes
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    hShadowX,
    hShadowY,
    hShadowBlur,
    hShadowSpread,
    hShadowColor
  } = attributes;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!uniqueId) {
      setAttributes({
        uniqueId: `af-${clientId.substring(0, 8)}`
      });
    }
  }, [uniqueId, clientId, setAttributes]);
  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [key]: value
    };
    setAttributes({
      items: newItems
    });
  };
  const removeItem = index => {
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({
      items: newItems
    });
  };
  const addNewItem = () => {
    setAttributes({
      items: [...items, {
        title: '',
        description: '',
        url: '',
        tags: ''
      }]
    });
  };

  // --- Dynamic Editor UI Styles ---
  const editorStyles = {
    container: {
      padding: '25px',
      background: '#f0f0f0',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxSizing: 'border-box'
    },
    masonryGrid: {
      columnCount: columnsDesktop,
      columnGap: `${gridGap}px`,
      width: '100%',
      display: 'block'
    },
    card: {
      background: cardBgColor,
      padding: '15px',
      borderRadius: `${borderRadius}px`,
      boxShadow: hasShadow ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` : 'none',
      border: hasShadow ? 'none' : '1px solid #ccc',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      position: 'relative',
      marginBottom: `${gridGap}px`,
      breakInside: 'avoid',
      display: 'inline-block',
      width: '100%',
      verticalAlign: 'top',
      boxSizing: 'border-box'
    },
    imageWrapper: {
      width: '100%',
      overflow: 'hidden',
      borderRadius: '4px',
      marginBottom: '15px',
      backgroundColor: '#e5e5e5',
      display: 'block',
      cursor: 'pointer',
      lineHeight: 0
    },
    image: {
      width: '100%',
      height: 'auto !important',
      display: 'block',
      transition: 'transform 0.5s ease'
    },
    tagItem: {
      padding: '3px 10px',
      borderRadius: '4px',
      fontWeight: '600',
      textTransform: 'uppercase',
      backgroundColor: tagBgColor,
      color: tagTextColor,
      fontSize: `${tagFontSize}px`,
      display: 'inline-block',
      marginRight: '5px',
      marginBottom: '5px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      alignItems: 'center'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #eee',
      width: '100%',
      clear: 'both',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center'
    },
    loadMorePreview: {
      padding: '10px 25px',
      borderRadius: '4px',
      backgroundColor: btnBgColor,
      color: btnTextColor,
      fontWeight: '600',
      fontSize: '14px',
      display: 'inline-block',
      cursor: 'default',
      marginTop: '10px',
      border: 'none'
    }
  };
  const hoverCSS = `
        #${uniqueId}-editor .portfolio-edit-card:hover {
            background: ${hCardBgColor || cardBgColor} !important;
            box-shadow: ${hasShadow ? `${hShadowX}px ${hShadowY}px ${hShadowBlur}px ${hShadowSpread}px ${hShadowColor}` : 'none'} !important;
        }
        ${hasZoom ? `
        #${uniqueId}-editor .portfolio-edit-card:hover .portfolio-edit-image {
            transform: scale(${zoomScale}) !important;
        }
        ` : ''}
    `;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("style", {
      children: hoverCSS
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Layout', 'axis-folio'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Columns (Desktop)",
          value: columnsDesktop,
          onChange: val => setAttributes({
            columnsDesktop: val
          }),
          min: 1,
          max: 6
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Columns (Tablet)",
          value: columnsTablet,
          onChange: val => setAttributes({
            columnsTablet: val
          }),
          min: 1,
          max: 4
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Columns (Mobile)",
          value: columnsMobile,
          onChange: val => setAttributes({
            columnsMobile: val
          }),
          min: 1,
          max: 2
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Grid Gap",
          value: gridGap,
          onChange: val => setAttributes({
            gridGap: val
          }),
          min: 0,
          max: 50
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pagination', 'axis-folio'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: "Enable Load More",
          checked: enableLoadMore,
          onChange: val => setAttributes({
            enableLoadMore: val
          })
        }), enableLoadMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "Button Text",
            value: loadMoreText,
            onChange: val => setAttributes({
              loadMoreText: val
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: "Items Per Page",
            value: postsPerPage,
            onChange: val => setAttributes({
              postsPerPage: val
            }),
            min: 1,
            max: 20
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card Appearance', 'axis-folio'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Border Radius",
          value: borderRadius,
          onChange: val => setAttributes({
            borderRadius: val
          }),
          min: 0,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: "Enable Box Shadow",
          checked: hasShadow,
          onChange: val => setAttributes({
            hasShadow: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: "Show Tags",
          checked: showTags,
          onChange: val => setAttributes({
            showTags: val
          })
        })]
      }), hasShadow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shadow Controls', 'axis-folio'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Standard State', 'axis-folio')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Blur",
          value: shadowBlur,
          onChange: val => setAttributes({
            shadowBlur: val
          }),
          min: 0,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Spread",
          value: shadowSpread,
          onChange: val => setAttributes({
            shadowSpread: val
          }),
          min: -20,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Offset X",
          value: shadowX,
          onChange: val => setAttributes({
            shadowX: val
          }),
          min: -50,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Offset Y",
          value: shadowY,
          onChange: val => setAttributes({
            shadowY: val
          }),
          min: -50,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {
          style: {
            margin: '20px 0'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover State', 'axis-folio')
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Hover Blur",
          value: hShadowBlur,
          onChange: val => setAttributes({
            hShadowBlur: val
          }),
          min: 0,
          max: 100
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Hover Spread",
          value: hShadowSpread,
          onChange: val => setAttributes({
            hShadowSpread: val
          }),
          min: -20,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Hover Offset X",
          value: hShadowX,
          onChange: val => setAttributes({
            hShadowX: val
          }),
          min: -50,
          max: 50
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: "Hover Offset Y",
          value: hShadowY,
          onChange: val => setAttributes({
            hShadowY: val
          }),
          min: -50,
          max: 50
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color Palette', 'axis-folio'),
        initialOpen: false,
        colorSettings: [{
          value: cardBgColor,
          onChange: val => setAttributes({
            cardBgColor: val
          }),
          label: "Card Background"
        }, {
          value: hCardBgColor,
          onChange: val => setAttributes({
            hCardBgColor: val
          }),
          label: "Hover Card Background"
        }, {
          value: shadowColor,
          onChange: val => setAttributes({
            shadowColor: val
          }),
          label: "Shadow Color"
        }, {
          value: hShadowColor,
          onChange: val => setAttributes({
            hShadowColor: val
          }),
          label: "Hover Shadow Color"
        }, {
          value: tagBgColor,
          onChange: val => setAttributes({
            tagBgColor: val
          }),
          label: "Tag Background"
        }, {
          value: tagTextColor,
          onChange: val => setAttributes({
            tagTextColor: val
          }),
          label: "Tag Text Color"
        }, {
          value: btnBgColor,
          onChange: val => setAttributes({
            btnBgColor: val
          }),
          label: "Button Background"
        }, {
          value: btnTextColor,
          onChange: val => setAttributes({
            btnTextColor: val
          }),
          label: "Button Text Color"
        }]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      id: `${uniqueId}-editor`,
      className: "portfolio-editor-wrapper",
      style: editorStyles.container,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        style: editorStyles.masonryGrid,
        children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "portfolio-edit-card",
          style: editorStyles.card,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            style: editorStyles.header,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("strong", {
              style: {
                color: titleColor
              },
              children: ["ITEM ", index + 1]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              isDestructive: true,
              icon: "trash",
              onClick: () => removeItem(index)
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
              onSelect: media => updateItem(index, 'url', media.url),
              allowedTypes: ['image'],
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                onClick: open,
                style: editorStyles.imageWrapper,
                children: item.url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: item.url,
                  className: "portfolio-edit-image",
                  style: editorStyles.image,
                  alt: ""
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  style: {
                    padding: '40px',
                    textAlign: 'center'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
                    icon: "format-image"
                  })
                })
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Title", "axis-folio"),
            value: item.title,
            onChange: val => updateItem(index, 'title', val),
            style: {
              color: titleColor
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Description", "axis-folio"),
            value: item.description,
            onChange: val => updateItem(index, 'description', val),
            style: {
              color: descColor
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tags (Comma separated)", "axis-folio"),
            value: item.tags,
            onChange: val => updateItem(index, 'tags', val)
          }), showTags && item.tags && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            style: {
              marginTop: '10px'
            },
            children: item.tags.split(',').map((tag, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              style: editorStyles.tagItem,
              children: tag.trim()
            }, i))
          })]
        }, index))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        style: editorStyles.footer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isPrimary: true,
          icon: "plus",
          onClick: addNewItem,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add New Item', 'axis-folio')
        }), enableLoadMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            borderTop: '1px dashed #ccc',
            width: '100%',
            marginTop: '10px',
            paddingTop: '20px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
            style: {
              fontSize: '11px',
              color: '#888',
              textTransform: 'uppercase',
              marginBottom: '5px'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Load More Preview', 'axis-folio')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            style: editorStyles.loadMorePreview,
            children: loadMoreText || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Load More', 'axis-folio')
          })]
        })]
      })]
    })]
  });
}

/***/ },

/***/ "./src/axis-folio/index.js"
/*!*********************************!*\
  !*** ./src/axis-folio/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/axis-folio/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/axis-folio/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/axis-folio/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ },

/***/ "./src/axis-folio/style.scss"
/*!***********************************!*\
  !*** ./src/axis-folio/style.scss ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/axis-folio/block.json"
/*!***********************************!*\
  !*** ./src/axis-folio/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/axis-folio","version":"0.1.0","title":"Axis Folio","category":"widgets","icon":"layout","attributes":{"uniqueId":{"type":"string"},"items":{"type":"array","default":[]},"columnsDesktop":{"type":"number","default":3},"columnsTablet":{"type":"number","default":2},"columnsMobile":{"type":"number","default":1},"borderRadius":{"type":"number","default":8},"hasShadow":{"type":"boolean","default":true},"showTags":{"type":"boolean","default":true},"cardBgColor":{"type":"string","default":"#ffffff"},"tagBgColor":{"type":"string","default":"#f0f0f0"},"tagTextColor":{"type":"string","default":"#555555"},"hasZoom":{"type":"boolean","default":true},"zoomScale":{"type":"number","default":1.05},"showTagLine":{"type":"boolean","default":true},"gridGap":{"type":"number","default":20},"titleColor":{"type":"string","default":"#111111"},"titleFontSize":{"type":"number","default":20},"descColor":{"type":"string","default":"#666666"},"descFontSize":{"type":"number","default":16},"tagFontSize":{"type":"number","default":11},"enableLoadMore":{"type":"boolean","default":false},"postsPerPage":{"type":"number","default":6},"loadMoreText":{"type":"string","default":"Load More"},"btnBgColor":{"type":"string","default":"#111111"},"btnTextColor":{"type":"string","default":"#ffffff"},"/* Shadow Attributes */":{"type":"string"},"shadowX":{"type":"number","default":0},"shadowY":{"type":"number","default":4},"shadowBlur":{"type":"number","default":12},"shadowSpread":{"type":"number","default":0},"shadowColor":{"type":"string","default":"rgba(0,0,0,0.1)"},"/* Hover Shadow Attributes */":{"type":"string"},"hShadowX":{"type":"number","default":0},"hShadowY":{"type":"number","default":8},"hShadowBlur":{"type":"number","default":20},"hShadowSpread":{"type":"number","default":0},"hShadowColor":{"type":"string","default":"rgba(0,0,0,0.2)"}},"supports":{"align":["wide","full"],"html":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"axis-folio/index": 0,
/******/ 			"axis-folio/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkaxis_folio"] = globalThis["webpackChunkaxis_folio"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["axis-folio/style-index"], () => (__webpack_require__("./src/axis-folio/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map