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
    align,
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
    tagBorderRadius,
    showTags,
    enableLoadMore,
    postsPerPage,
    loadMoreText,
    btnBgColor,
    btnTextColor,
    btnHovBgColor,
    btnHovTextColor,
    btnBorderRadius,
    hasZoom,
    zoomScale,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    hShadowX,
    hShadowY,
    hShadowBlur,
    hShadowSpread,
    hShadowColor,
    showTagDivider,
    dividerWidth,
    dividerHeight,
    dividerColor,
    titleFontFamily,
    descFontFamily,
    tagFontFamily,
    iconListFontFamily,
    iconListFontWeight,
    iconListFontSize,
    iconListTextTransform,
    showIconListIcon,
    titleFontSize,
    titlePaddingTop,
    titlePaddingRight,
    titlePaddingBottom,
    titlePaddingLeft,
    descFontSize,
    descPaddingTop,
    descPaddingRight,
    descPaddingBottom,
    descPaddingLeft,
    tagPaddingTop,
    tagPaddingRight,
    tagPaddingBottom,
    tagPaddingLeft,
    iconListPaddingTop,
    iconListPaddingRight,
    iconListPaddingBottom,
    iconListPaddingLeft,
    iconListSubtitleGap,
    iconCardEndGap,
    iconLineGap,
    iconTextGap,
    iconListTextColor
  } = attributes;
  const safeItems = Array.isArray(items) ? items : [];
  const [hoveredIndex, setHoveredIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const [isBtnHovered, setIsBtnHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [draggedIndex, setDraggedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const [draggingOverIndex, setDraggingOverIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const alignWrapperStyle = align === 'wide' ? {
    maxWidth: 'var(--wp--style--global--content-size, 1200px)',
    width: '100%'
  } : align === 'full' ? {
    width: '100%'
  } : undefined;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: align ? `portfolio-editor-wrapper align${align}` : 'portfolio-editor-wrapper',
    style: alignWrapperStyle
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!uniqueId) {
      setAttributes({
        uniqueId: `af-${clientId.substring(0, 8)}`
      });
    }
  }, [uniqueId, clientId, setAttributes]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const handleMouseUp = () => {
      if (draggedIndex !== null) {
        setDraggedIndex(null);
        setDraggingOverIndex(null);
      }
    };
    if (draggedIndex !== null) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [draggedIndex]);
  const updateItem = (index, key, value) => {
    const currentItems = Array.isArray(items) ? items : [];
    const newItems = [...currentItems];
    if (!newItems[index]) {
      newItems[index] = {};
    }
    newItems[index] = {
      ...newItems[index],
      [key]: value
    };
    setAttributes({
      items: newItems
    });
  };
  const removeItem = index => {
    const currentItems = Array.isArray(items) ? items : [];
    const newItems = currentItems.filter((_, i) => i !== index);
    setAttributes({
      items: newItems
    });
  };
  const addNewItem = () => {
    setAttributes({
      items: [...items, {
        iconType: 'arrow-right-alt2',
        iconList: '',
        title: '',
        description: '',
        url: '',
        tags: '',
        linkUrl: '',
        openInNewTab: false
      }]
    });
  };
  const handleDragHandleMouseDown = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedIndex(index);
  };
  const handleMouseEnterCard = index => {
    setDraggingOverIndex(index);
    if (draggedIndex !== null && draggedIndex !== index) {
      const newItems = [...safeItems];
      const draggedItem = newItems[draggedIndex];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setAttributes({
        items: newItems
      });
      setDraggedIndex(index);
    }
  };

  // Updated Font List - Added Manrope along with standard popular open web fonts
  const fontOptions = [{
    label: 'Default',
    value: 'inherit'
  }, {
    label: 'Arial',
    value: 'Arial, sans-serif'
  }, {
    label: 'Courier New',
    value: '"Courier New", Courier, monospace'
  }, {
    label: 'Georgia',
    value: 'Georgia, serif'
  }, {
    label: 'Helvetica',
    value: 'Helvetica, Arial, sans-serif'
  }, {
    label: 'Impact',
    value: 'Impact, Charcoal, sans-serif'
  }, {
    label: 'Inter',
    value: '"Inter", sans-serif'
  }, {
    label: 'Lucida Sans Unicode',
    value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif'
  }, {
    label: 'Manrope',
    value: '"Manrope", sans-serif'
  }, {
    label: 'Montserrat',
    value: '"Montserrat", sans-serif'
  }, {
    label: 'Open Sans',
    value: '"Open Sans", sans-serif'
  }, {
    label: 'Poppins',
    value: '"Poppins", sans-serif'
  }, {
    label: 'Roboto',
    value: '"Roboto", sans-serif'
  }, {
    label: 'Segoe UI',
    value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  }, {
    label: 'Tahoma',
    value: 'Tahoma, Geneva, sans-serif'
  }, {
    label: 'Times New Roman',
    value: 'Times New Roman, serif'
  }, {
    label: 'Trebuchet MS',
    value: '"Trebuchet MS", Helvetica, sans-serif'
  }, {
    label: 'Verdana',
    value: 'Verdana, sans-serif'
  }];
  const iconOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Arrow Right', 'axis-folio'),
    value: 'arrow-right-alt2'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Arrow Left', 'axis-folio'),
    value: 'arrow-left-alt2'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Arrow Up', 'axis-folio'),
    value: 'arrow-up-alt2'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Arrow Down', 'axis-folio'),
    value: 'arrow-down-alt2'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Star', 'axis-folio'),
    value: 'star-filled'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plus', 'axis-folio'),
    value: 'plus'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Check', 'axis-folio'),
    value: 'yes'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dash', 'axis-folio'),
    value: 'minus'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Code', 'axis-folio'),
    value: 'editor-code'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Generic', 'axis-folio'),
    value: 'admin-generic'
  }];
  const buildPadding = (top, right, bottom, left, fallback) => {
    const fallbackValue = fallback ?? 0;
    return `${top ?? fallbackValue}px ${right ?? fallbackValue}px ${bottom ?? fallbackValue}px ${left ?? fallbackValue}px`;
  };
  const getCardStyle = index => {
    const isHovered = hoveredIndex === index;
    return {
      borderRadius: `${borderRadius}px`,
      transition: 'all 0.3s ease-in-out',
      boxShadow: hasShadow ? isHovered ? `${hShadowX}px ${hShadowY}px ${hShadowBlur}px ${hShadowSpread}px ${hShadowColor}` : `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` : 'none',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box'
    };
  };
  const editorStyles = {
    containerLayout: {
      padding: '20px',
      boxSizing: 'border-box',
      width: '100%'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`,
      gap: `${gridGap}px`,
      width: '100%',
      boxSizing: 'border-box'
    },
    imageWrapper: {
      width: '100%',
      backgroundColor: 'transparent',
      minHeight: '220px',
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px'
    },
    image: index => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: 'transform 0.35s ease-in-out',
      transform: hasZoom && hoveredIndex === index ? `scale(${zoomScale})` : 'scale(1)'
    }),
    tagItem: {
      padding: '6px 10px',
      borderRadius: typeof tagBorderRadius === 'number' ? `${tagBorderRadius}px` : '999px',
      backgroundColor: tagBgColor || '#f1f1f1',
      color: tagTextColor || '#6b6b6b',
      fontSize: `${tagFontSize}px`,
      fontFamily: tagFontFamily,
      display: 'inline-block',
      marginRight: '8px',
      marginBottom: '8px',
      boxShadow: 'none'
    },
    sectionDivider: {
      borderTop: '1px solid #e6e6e6',
      margin: '20px 0',
      width: '100%'
    },
    previewSection: {
      backgroundColor: '#f9fbfd',
      padding: '18px 0 12px',
      borderRadius: '12px',
      border: '1px solid #dde7ef',
      marginBottom: '18px',
      boxShadow: '0 6px 20px rgba(30,40,50,0.06)'
    },
    previewHeading: {
      fontSize: '14px',
      fontWeight: '700',
      margin: '0 0 16px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#39444d',
      padding: '0 18px'
    },
    cardContent: {
      backgroundColor: 'transparent',
      padding: '18px',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      boxSizing: 'border-box'
    },
    editSection: {
      backgroundColor: '#ffffff',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #e6e6e6'
    },
    sectionHeading: {
      fontSize: '13px',
      fontWeight: '700',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: '#39444d'
    },
    loadMorePreview: {
      padding: '12px 30px',
      backgroundColor: isBtnHovered ? btnHovBgColor : btnBgColor,
      color: isBtnHovered ? btnHovTextColor : btnTextColor,
      borderRadius: `${btnBorderRadius}px`,
      border: 'none',
      display: 'inline-block',
      fontWeight: '600',
      marginTop: '20px',
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer'
    },
    divider: {
      width: `${dividerWidth}%`,
      height: `${dividerHeight}px`,
      backgroundColor: dividerColor,
      margin: '15px 0'
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
        className: "axis-folio-tabs",
        activeClass: "is-active",
        tabs: [{
          name: 'settings',
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'axis-folio')
        }, {
          name: 'styles',
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Styles', 'axis-folio')
        }],
        children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [tab.name === 'settings' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Layout', 'axis-folio'),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns (Desktop)', 'axis-folio'),
                value: columnsDesktop,
                onChange: v => setAttributes({
                  columnsDesktop: v
                }),
                min: 1,
                max: 6
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns (tablet)', 'axis-folio'),
                value: columnsTablet,
                onChange: v => setAttributes({
                  columnsTablet: v
                }),
                min: 1,
                max: 4
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns (mobile)', 'axis-folio'),
                value: columnsMobile,
                onChange: v => setAttributes({
                  columnsMobile: v
                }),
                min: 1,
                max: 2
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid Gap', 'axis-folio'),
                value: gridGap,
                onChange: v => setAttributes({
                  gridGap: v
                }),
                min: 0,
                max: 100
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pagination', 'axis-folio'),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enable Load more', 'axis-folio'),
                checked: enableLoadMore,
                onChange: v => setAttributes({
                  enableLoadMore: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Text', 'axis-folio'),
                value: loadMoreText,
                onChange: v => setAttributes({
                  loadMoreText: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('items per page', 'axis-folio'),
                value: postsPerPage,
                onChange: v => setAttributes({
                  postsPerPage: v
                }),
                min: 1,
                max: 20
              })]
            })]
          }), tab.name === 'styles' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('card appearence', 'axis-folio'),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card Border Radius', 'axis-folio'),
                value: borderRadius,
                onChange: v => setAttributes({
                  borderRadius: v
                }),
                min: 0,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('enable box shadow', 'axis-folio'),
                checked: hasShadow,
                onChange: v => setAttributes({
                  hasShadow: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('show tags', 'axis-folio'),
                checked: showTags,
                onChange: v => setAttributes({
                  showTags: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('show divider above tags', 'axis-folio'),
                checked: showTagDivider,
                onChange: v => setAttributes({
                  showTagDivider: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Divider Width (%)', 'axis-folio'),
                value: dividerWidth,
                onChange: v => setAttributes({
                  dividerWidth: v
                }),
                min: 1,
                max: 100
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Divider Height (px)', 'axis-folio'),
                value: dividerHeight,
                onChange: v => setAttributes({
                  dividerHeight: v
                }),
                min: 1,
                max: 10
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('typography', 'axis-folio'),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title', 'axis-folio')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font family', 'axis-folio'),
                value: titleFontFamily,
                options: fontOptions,
                onChange: v => setAttributes({
                  titleFontFamily: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font size', 'axis-folio'),
                value: titleFontSize,
                onChange: v => setAttributes({
                  titleFontSize: v
                }),
                min: 10,
                max: 100
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BoxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'axis-folio'),
                values: {
                  top: titlePaddingTop ? `${titlePaddingTop}px` : '0px',
                  right: titlePaddingRight ? `${titlePaddingRight}px` : '0px',
                  bottom: titlePaddingBottom ? `${titlePaddingBottom}px` : '0px',
                  left: titlePaddingLeft ? `${titlePaddingLeft}px` : '0px'
                },
                onChange: values => setAttributes({
                  titlePaddingTop: parseInt(values.top, 10) || 0,
                  titlePaddingRight: parseInt(values.right, 10) || 0,
                  titlePaddingBottom: parseInt(values.bottom, 10) || 0,
                  titlePaddingLeft: parseInt(values.left, 10) || 0
                }),
                units: ['px'],
                inputProps: {
                  min: 0,
                  max: 80
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('description', 'axis-folio')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font family', 'axis-folio'),
                value: descFontFamily,
                options: fontOptions,
                onChange: v => setAttributes({
                  descFontFamily: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font size', 'axis-folio'),
                value: descFontSize,
                onChange: v => setAttributes({
                  descFontSize: v
                }),
                min: 10,
                max: 100
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BoxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'axis-folio'),
                values: {
                  top: descPaddingTop ? `${descPaddingTop}px` : '0px',
                  right: descPaddingRight ? `${descPaddingRight}px` : '0px',
                  bottom: descPaddingBottom ? `${descPaddingBottom}px` : '0px',
                  left: descPaddingLeft ? `${descPaddingLeft}px` : '0px'
                },
                onChange: values => setAttributes({
                  descPaddingTop: parseInt(values.top, 10) || 0,
                  descPaddingRight: parseInt(values.right, 10) || 0,
                  descPaddingBottom: parseInt(values.bottom, 10) || 0,
                  descPaddingLeft: parseInt(values.left, 10) || 0
                }),
                units: ['px'],
                inputProps: {
                  min: 0,
                  max: 80
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('tags', 'axis-folio')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font family', 'axis-folio'),
                value: tagFontFamily,
                options: fontOptions,
                onChange: v => setAttributes({
                  tagFontFamily: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font size', 'axis-folio'),
                value: tagFontSize,
                onChange: v => setAttributes({
                  tagFontSize: v
                }),
                min: 8,
                max: 30
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('border radius', 'axis-folio'),
                value: tagBorderRadius,
                onChange: v => setAttributes({
                  tagBorderRadius: v
                }),
                min: 0,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BoxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'axis-folio'),
                values: {
                  top: tagPaddingTop ? `${tagPaddingTop}px` : '0px',
                  right: tagPaddingRight ? `${tagPaddingRight}px` : '0px',
                  bottom: tagPaddingBottom ? `${tagPaddingBottom}px` : '0px',
                  left: tagPaddingLeft ? `${tagPaddingLeft}px` : '0px'
                },
                onChange: values => setAttributes({
                  tagPaddingTop: parseInt(values.top, 10) || 0,
                  tagPaddingRight: parseInt(values.right, 10) || 0,
                  tagPaddingBottom: parseInt(values.bottom, 10) || 0,
                  tagPaddingLeft: parseInt(values.left, 10) || 0
                }),
                units: ['px'],
                inputProps: {
                  min: 0,
                  max: 80
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type styles', 'axis-folio'),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show icon', 'axis-folio'),
                help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display the icon between the line and type text.', 'axis-folio'),
                checked: showIconListIcon,
                onChange: v => setAttributes({
                  showIconListIcon: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card end to line gap', 'axis-folio'),
                value: iconCardEndGap,
                onChange: v => setAttributes({
                  iconCardEndGap: v
                }),
                min: 0,
                max: 80
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font family', 'axis-folio'),
                value: iconListFontFamily,
                options: fontOptions,
                onChange: v => setAttributes({
                  iconListFontFamily: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font weight', 'axis-folio'),
                value: iconListFontWeight,
                options: [{
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Light', 'axis-folio'),
                  value: '300'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Normal', 'axis-folio'),
                  value: '400'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Medium', 'axis-folio'),
                  value: '500'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Semi Bold', 'axis-folio'),
                  value: '600'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bold', 'axis-folio'),
                  value: '700'
                }],
                onChange: v => setAttributes({
                  iconListFontWeight: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('font size', 'axis-folio'),
                value: iconListFontSize,
                onChange: v => setAttributes({
                  iconListFontSize: v
                }),
                min: 8,
                max: 48
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('text transform', 'axis-folio'),
                value: iconListTextTransform,
                options: [{
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'axis-folio'),
                  value: 'none'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uppercase', 'axis-folio'),
                  value: 'uppercase'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Capitalize', 'axis-folio'),
                  value: 'capitalize'
                }, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Lowercase', 'axis-folio'),
                  value: 'lowercase'
                }],
                onChange: v => setAttributes({
                  iconListTextTransform: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BoxControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Padding', 'axis-folio'),
                values: {
                  top: iconListPaddingTop ? `${iconListPaddingTop}px` : '0px',
                  right: iconListPaddingRight ? `${iconListPaddingRight}px` : '0px',
                  bottom: iconListPaddingBottom ? `${iconListPaddingBottom}px` : '0px',
                  left: iconListPaddingLeft ? `${iconListPaddingLeft}px` : '0px'
                },
                onChange: values => setAttributes({
                  iconListPaddingTop: parseInt(values.top, 10) || 0,
                  iconListPaddingRight: parseInt(values.right, 10) || 0,
                  iconListPaddingBottom: parseInt(values.bottom, 10) || 0,
                  iconListPaddingLeft: parseInt(values.left, 10) || 0
                }),
                units: ['px'],
                inputProps: {
                  min: 0,
                  max: 80
                }
              }), showIconListIcon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon to text gap', 'axis-folio'),
                  value: iconTextGap,
                  onChange: v => setAttributes({
                    iconTextGap: v
                  }),
                  min: 0,
                  max: 80
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Line to icon gap', 'axis-folio'),
                  value: iconLineGap,
                  onChange: v => setAttributes({
                    iconLineGap: v
                  }),
                  min: 0,
                  max: 80
                })]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Line to text gap', 'axis-folio'),
                value: iconLineGap,
                onChange: v => setAttributes({
                  iconLineGap: v
                }),
                min: 0,
                max: 80
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('image controls', 'axis-folio'),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('enable image zoom', 'axis-folio'),
                checked: hasZoom,
                onChange: v => setAttributes({
                  hasZoom: v
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('zoom scale', 'axis-folio'),
                value: zoomScale,
                onChange: v => setAttributes({
                  zoomScale: v
                }),
                min: 1,
                max: 2,
                step: 0.1
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button styles', 'axis-folio'),
              initialOpen: false,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button Border Radius', 'axis-folio'),
                value: btnBorderRadius,
                onChange: v => setAttributes({
                  btnBorderRadius: v
                }),
                min: 0,
                max: 50
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('shadow controls', 'axis-folio'),
              initialOpen: false,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Standard State', 'axis-folio')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blur', 'axis-folio'),
                value: shadowBlur,
                onChange: v => setAttributes({
                  shadowBlur: v
                }),
                min: 0,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spread', 'axis-folio'),
                value: shadowSpread,
                onChange: v => setAttributes({
                  shadowSpread: v
                }),
                min: -20,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Offset X', 'axis-folio'),
                value: shadowX,
                onChange: v => setAttributes({
                  shadowX: v
                }),
                min: -50,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Offset Y', 'axis-folio'),
                value: shadowY,
                onChange: v => setAttributes({
                  shadowY: v
                }),
                min: -50,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover State', 'axis-folio')
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Blur', 'axis-folio'),
                value: hShadowBlur,
                onChange: v => setAttributes({
                  hShadowBlur: v
                }),
                min: 0,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Spread', 'axis-folio'),
                value: hShadowSpread,
                onChange: v => setAttributes({
                  hShadowSpread: v
                }),
                min: -20,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Offset X', 'axis-folio'),
                value: hShadowX,
                onChange: v => setAttributes({
                  hShadowX: v
                }),
                min: -50,
                max: 50
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hover Offset Y', 'axis-folio'),
                value: hShadowY,
                onChange: v => setAttributes({
                  hShadowY: v
                }),
                min: -50,
                max: 50
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.PanelColorSettings, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Color Palette', 'axis-folio'),
              initialOpen: false,
              colorSettings: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('card background', 'axis-folio'),
                value: cardBgColor,
                onChange: v => setAttributes({
                  cardBgColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('hover card background', 'axis-folio'),
                value: hCardBgColor,
                onChange: v => setAttributes({
                  hCardBgColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('shadow color', 'axis-folio'),
                value: shadowColor,
                onChange: v => setAttributes({
                  shadowColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('hover shadow color', 'axis-folio'),
                value: hShadowColor,
                onChange: v => setAttributes({
                  hShadowColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('type text color', 'axis-folio'),
                value: iconListTextColor,
                onChange: v => setAttributes({
                  iconListTextColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('tag background', 'axis-folio'),
                value: tagBgColor,
                onChange: v => setAttributes({
                  tagBgColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('tag text color', 'axis-folio'),
                value: tagTextColor,
                onChange: v => setAttributes({
                  tagTextColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('divider color', 'axis-folio'),
                value: dividerColor,
                onChange: v => setAttributes({
                  dividerColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button background', 'axis-folio'),
                value: btnBgColor,
                onChange: v => setAttributes({
                  btnBgColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button text color', 'axis-folio'),
                value: btnTextColor,
                onChange: v => setAttributes({
                  btnTextColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button hover background', 'axis-folio'),
                value: btnHovBgColor,
                onChange: v => setAttributes({
                  btnHovBgColor: v
                })
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button hover text color', 'axis-folio'),
                value: btnHovTextColor,
                onChange: v => setAttributes({
                  btnHovTextColor: v
                })
              }]
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      style: editorStyles.containerLayout,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        style: editorStyles.gridContainer,
        children: safeItems.map((item, index) => {
          const itemTags = String(item.tags ?? '');
          const tagsArray = itemTags.split(',').map(t => t.trim()).filter(Boolean);
          const previewBgColor = hoveredIndex === index ? hCardBgColor || cardBgColor || editorStyles.previewSection.backgroundColor : cardBgColor || editorStyles.previewSection.backgroundColor;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "item-card-wrapper",
            style: {
              ...getCardStyle(index),
              opacity: draggedIndex === index ? 0.5 : 1
            },
            onMouseEnter: () => setHoveredIndex(index),
            onMouseLeave: () => setHoveredIndex(null),
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: {
                ...editorStyles.previewSection,
                backgroundColor: previewBgColor
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                style: editorStyles.previewHeading,
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('PREVIEW', 'axis-folio')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                style: {
                  padding: '0 18px 10px',
                  background: 'transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 10
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  onMouseDown: e => handleDragHandleMouseDown(e, index),
                  onMouseEnter: () => handleMouseEnterCard(index),
                  style: {
                    cursor: draggedIndex === null ? 'grab' : draggedIndex === index ? 'grabbing' : 'grab',
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center'
                  },
                  title: "Drag to reorder",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
                    icon: "menu",
                    size: 20,
                    style: {
                      color: '#666'
                    }
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  isDestructive: true,
                  onClick: () => removeItem(index),
                  icon: "trash"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                  onSelect: media => updateItem(index, 'url', media.url),
                  allowedTypes: ['image'],
                  render: ({
                    open
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      style: {
                        ...editorStyles.imageWrapper,
                        backgroundColor: previewBgColor
                      },
                      onClick: open,
                      children: item.url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                        src: item.url,
                        style: editorStyles.image(index),
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
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      style: {
                        marginTop: '12px',
                        textAlign: 'center',
                        background: 'transparent',
                        padding: '0 18px'
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        variant: "secondary",
                        onClick: open,
                        children: item.url ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Change Image', 'axis-folio') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Upload Image', 'axis-folio')
                      })
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                style: editorStyles.cardContent,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  style: {
                    marginBottom: '8px'
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      padding: buildPadding(iconListPaddingTop, iconListPaddingRight, iconListPaddingBottom, iconListPaddingLeft, 0),
                      marginBottom: '12px'
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: `${iconCardEndGap}px`,
                        gap: `${iconLineGap}px`,
                        color: iconListTextColor || titleColor,
                        opacity: item.iconList || item.iconType ? 1 : 0.5
                      },
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                        style: {
                          width: '56px',
                          height: '2px',
                          backgroundColor: dividerColor || '#6b7280',
                          display: 'inline-block',
                          borderRadius: '999px',
                          flexShrink: 0
                        }
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                        style: {
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: showIconListIcon ? `${iconTextGap}px` : 0
                        },
                        children: [showIconListIcon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
                          icon: item.iconType || 'arrow-right-alt2',
                          size: 16
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                          style: {
                            fontFamily: iconListFontFamily,
                            fontWeight: iconListFontWeight,
                            fontSize: `${iconListFontSize}px`,
                            textTransform: iconListTextTransform,
                            letterSpacing: '0.1em'
                          },
                          children: item.iconList || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type', 'axis-folio')
                        })]
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    style: {
                      fontFamily: titleFontFamily,
                      fontSize: `${titleFontSize}px`,
                      fontWeight: '700',
                      color: titleColor,
                      marginBottom: '6px',
                      padding: buildPadding(titlePaddingTop, titlePaddingRight, titlePaddingBottom, titlePaddingLeft, 0)
                    },
                    children: item.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Title', 'axis-folio')
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    style: {
                      fontFamily: descFontFamily,
                      fontSize: `${descFontSize}px`,
                      color: descColor,
                      marginBottom: '12px',
                      padding: buildPadding(descPaddingTop, descPaddingRight, descPaddingBottom, descPaddingLeft, 0)
                    },
                    children: item.description || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Description', 'axis-folio')
                  }), showTagDivider && tagsArray.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    style: editorStyles.divider
                  }), showTags && tagsArray.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      padding: buildPadding(tagPaddingTop, tagPaddingRight, tagPaddingBottom, tagPaddingLeft, 0)
                    },
                    children: tagsArray.map((t, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                      style: editorStyles.tagItem,
                      children: t
                    }, i))
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              style: editorStyles.editSection,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                style: editorStyles.sectionHeading,
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit', 'axis-folio')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                style: {
                  display: 'grid',
                  gap: '16px'
                },
                children: [showIconListIcon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  style: {
                    borderTop: '1px solid #e6e6e6',
                    paddingTop: '16px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon', 'axis-folio'),
                    value: item.iconType,
                    options: iconOptions,
                    onChange: v => updateItem(index, 'iconType', v)
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  style: {
                    borderTop: '1px solid #e6e6e6',
                    paddingTop: '16px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type', 'axis-folio'),
                    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Type', 'axis-folio'),
                    value: item.iconList || '',
                    onChange: v => updateItem(index, 'iconList', v)
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  style: {
                    borderTop: '1px solid #e6e6e6',
                    paddingTop: '16px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                    placeholder: "Title",
                    value: item.title || '',
                    onChange: v => updateItem(index, 'title', v)
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  style: {
                    borderTop: '1px solid #e6e6e6',
                    paddingTop: '16px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
                    placeholder: "Description",
                    value: item.description || '',
                    onChange: v => updateItem(index, 'description', v)
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  style: {
                    borderTop: '1px solid #e6e6e6',
                    paddingTop: '16px'
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                    label: "Link URL",
                    placeholder: "https://...",
                    value: item.linkUrl || '',
                    onChange: v => updateItem(index, 'linkUrl', v)
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
                    label: "Open in New Tab",
                    checked: !!item.openInNewTab,
                    onChange: v => updateItem(index, 'openInNewTab', v)
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                    label: "Tags (Comma Separated)",
                    placeholder: "Design, Web, App",
                    value: itemTags,
                    onChange: v => updateItem(index, 'tags', v)
                  })]
                })]
              })]
            })]
          }, index);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        style: {
          marginTop: '40px',
          textAlign: 'center',
          width: '100%'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "primary",
          onClick: addNewItem,
          icon: "plus",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Portfolio Item', 'axis-folio')
        }), enableLoadMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          style: {
            marginTop: '20px',
            borderTop: '1px dashed #ccc',
            paddingTop: '20px',
            width: '100%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
            style: editorStyles.loadMorePreview,
            onMouseEnter: () => setIsBtnHovered(true),
            onMouseLeave: () => setIsBtnHovered(false),
            children: loadMoreText || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Load More', 'axis-folio')
          })
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

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/axis-folio","version":"0.1.0","title":"Axis Folio","category":"widgets","icon":"layout","attributes":{"btnBorderRadius":{"type":"number","default":4},"uniqueId":{"type":"string"},"items":{"type":"array","default":[]},"columnsDesktop":{"type":"number","default":3},"columnsTablet":{"type":"number","default":2},"columnsMobile":{"type":"number","default":1},"borderRadius":{"type":"number","default":8},"hasShadow":{"type":"boolean","default":true},"showTags":{"type":"boolean","default":true},"cardBgColor":{"type":"string","default":"#ffffff"},"hCardBgColor":{"type":"string","default":"#ffffff"},"tagBgColor":{"type":"string","default":"#f0f0f0"},"tagTextColor":{"type":"string","default":"#555555"},"hasZoom":{"type":"boolean","default":true},"zoomScale":{"type":"number","default":1.05},"showTagLine":{"type":"boolean","default":true},"gridGap":{"type":"number","default":20},"titleColor":{"type":"string","default":"#111111"},"titleFontSize":{"type":"number","default":20},"titlePadding":{"type":"number","default":0},"titlePaddingTop":{"type":"number","default":0},"titlePaddingRight":{"type":"number","default":0},"titlePaddingBottom":{"type":"number","default":0},"titlePaddingLeft":{"type":"number","default":0},"descColor":{"type":"string","default":"#666666"},"descFontSize":{"type":"number","default":16},"descPadding":{"type":"number","default":0},"descPaddingTop":{"type":"number","default":0},"descPaddingRight":{"type":"number","default":0},"descPaddingBottom":{"type":"number","default":0},"descPaddingLeft":{"type":"number","default":0},"tagFontSize":{"type":"number","default":11},"tagPadding":{"type":"number","default":0},"tagPaddingTop":{"type":"number","default":0},"tagPaddingRight":{"type":"number","default":0},"tagPaddingBottom":{"type":"number","default":0},"tagPaddingLeft":{"type":"number","default":0},"tagBorderRadius":{"type":"number","default":999},"enableLoadMore":{"type":"boolean","default":false},"postsPerPage":{"type":"number","default":6},"loadMoreText":{"type":"string","default":"Load More"},"btnBgColor":{"type":"string","default":"#111111"},"btnTextColor":{"type":"string","default":"#ffffff"},"btnHovBgColor":{"type":"string","default":"#333333"},"btnHovTextColor":{"type":"string","default":"#ffffff"},"shadowX":{"type":"number","default":0},"shadowY":{"type":"number","default":4},"shadowBlur":{"type":"number","default":12},"shadowSpread":{"type":"number","default":0},"shadowColor":{"type":"string","default":"rgba(0,0,0,0.1)"},"hShadowX":{"type":"number","default":0},"hShadowY":{"type":"number","default":8},"hShadowBlur":{"type":"number","default":20},"hShadowSpread":{"type":"number","default":0},"hShadowColor":{"type":"string","default":"rgba(0,0,0,0.2)"},"showTagDivider":{"type":"boolean","default":false},"dividerWidth":{"type":"number","default":100},"dividerHeight":{"type":"number","default":1},"dividerColor":{"type":"string","default":"#eeeeee"},"titleFontFamily":{"type":"string","default":"inherit"},"descFontFamily":{"type":"string","default":"inherit"},"tagFontFamily":{"type":"string","default":"inherit"},"iconListFontFamily":{"type":"string","default":"inherit"},"iconListFontWeight":{"type":"string","default":"400"},"iconListFontSize":{"type":"number","default":12},"iconListTextTransform":{"type":"string","default":"uppercase"},"showIconListIcon":{"type":"boolean","default":true},"iconListPaddingTop":{"type":"number","default":0},"iconListPaddingRight":{"type":"number","default":0},"iconListPaddingBottom":{"type":"number","default":0},"iconListPaddingLeft":{"type":"number","default":0},"iconListSubtitleGap":{"type":"number","default":10},"iconCardEndGap":{"type":"number","default":8},"iconLineGap":{"type":"number","default":10},"iconTextGap":{"type":"number","default":8}},"supports":{"align":true,"html":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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