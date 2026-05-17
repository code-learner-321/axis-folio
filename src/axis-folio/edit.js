import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck, 
    PanelColorSettings,
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    Button, 
    TextControl, 
    TextareaControl, 
    Dashicon, 
    RangeControl, 
    ToggleControl,
    SelectControl,
    TabPanel,
    BoxControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { 
        align, uniqueId, items = [], columnsDesktop, columnsTablet, columnsMobile, gridGap,
        borderRadius, hasShadow, cardBgColor, hCardBgColor,
        titleColor, descColor, tagBgColor, tagTextColor, tagFontSize, tagBorderRadius,
        showTags,
        enableLoadMore, postsPerPage, loadMoreText, btnBgColor, btnTextColor,
        btnHovBgColor, btnHovTextColor, btnBorderRadius,
        hasZoom, zoomScale,
        shadowX, shadowY, shadowBlur, shadowSpread, shadowColor,
        hShadowX, hShadowY, hShadowBlur, hShadowSpread, hShadowColor,
        showTagDivider, dividerWidth, dividerHeight, dividerColor,
        titleFontFamily, descFontFamily, tagFontFamily,
        titleFontSize, titlePaddingTop, titlePaddingRight, titlePaddingBottom, titlePaddingLeft,
        descFontSize, descPaddingTop, descPaddingRight, descPaddingBottom, descPaddingLeft,
        tagPadding, tagPaddingTop, tagPaddingRight, tagPaddingBottom, tagPaddingLeft
    } = attributes;

    const safeItems = Array.isArray( items ) ? items : [];

    const [ hoveredIndex, setHoveredIndex ] = useState( null );
    const [ isBtnHovered, setIsBtnHovered ] = useState( false );
    const [ draggedIndex, setDraggedIndex ] = useState( null );
    const [ draggingOverIndex, setDraggingOverIndex ] = useState( null );

    // This assigns native alignment selectors safely to the topmost div boundary to handle block widths
    const alignWrapperStyle = align === 'wide'
        ? { maxWidth: 'var(--wp--style--global--content-size, 1200px)', width: '100%' }
        : align === 'full'
            ? { width: '100%' }
            : undefined;

    const blockProps = useBlockProps({
        className: align ? `portfolio-editor-wrapper align${ align }` : 'portfolio-editor-wrapper',
        style: alignWrapperStyle,
    });

    useEffect( () => {
        if ( ! uniqueId ) {
            setAttributes( { uniqueId: `af-${ clientId.substring( 0, 8 ) }` } );
        }
    }, [ uniqueId, clientId, setAttributes ] );

    useEffect( () => {
        const handleMouseUp = () => {
            if ( draggedIndex !== null ) {
                setDraggedIndex( null );
                setDraggingOverIndex( null );
            }
        };

        if ( draggedIndex !== null ) {
            document.addEventListener( 'mouseup', handleMouseUp );
            return () => document.removeEventListener( 'mouseup', handleMouseUp );
        }
    }, [ draggedIndex ] );

    const updateItem = ( index, key, value ) => {
        const currentItems = Array.isArray( items ) ? items : [];
        const newItems = [ ...currentItems ];
        if ( ! newItems[ index ] ) {
            newItems[ index ] = {};
        }
        newItems[ index ] = { ...newItems[ index ], [ key ]: value };
        setAttributes( { items: newItems } );
    };

    const removeItem = ( index ) => {
        const currentItems = Array.isArray( items ) ? items : [];
        const newItems = currentItems.filter( ( _, i ) => i !== index );
        setAttributes( { items: newItems } );
    };

    const addNewItem = () => {
        setAttributes( { items: [ ...items, { title: '', description: '', url: '', tags: '', linkUrl: '', openInNewTab: false } ] } );
    };

    const handleDragHandleMouseDown = ( e, index ) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedIndex( index );
    };

    const handleMouseEnterCard = ( index ) => {
        setDraggingOverIndex( index );
        
        if ( draggedIndex !== null && draggedIndex !== index ) {
            const newItems = [ ...safeItems ];
            const draggedItem = newItems[ draggedIndex ];
            newItems.splice( draggedIndex, 1 );
            newItems.splice( index, 0, draggedItem );
            setAttributes( { items: newItems } );
            setDraggedIndex( index );
        }
    };

    const fontOptions = [
        { label: 'Default', value: 'inherit' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' }
    ];

    const buildPadding = ( top, right, bottom, left, fallback ) => {
        const fallbackValue = fallback ?? 0;
        return `${ top ?? fallbackValue }px ${ right ?? fallbackValue }px ${ bottom ?? fallbackValue }px ${ left ?? fallbackValue }px`;
    };

    const getCardStyle = ( index ) => {
        const isHovered = hoveredIndex === index;
        return {
            borderRadius: `${borderRadius}px`,
            transition: 'all 0.3s ease-in-out',
            boxShadow: hasShadow 
                ? ( isHovered 
                    ? `${hShadowX}px ${hShadowY}px ${hShadowBlur}px ${hShadowSpread}px ${hShadowColor}`
                    : `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` )
                : 'none',
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
        imageWrapper: { width: '100%', backgroundColor: 'transparent', minHeight: '220px', cursor: 'pointer', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
        image: ( index ) => ( { 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease-in-out',
            transform: ( hasZoom && hoveredIndex === index ) ? `scale(${zoomScale})` : 'scale(1)'
        } ),
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

    return (
        <div { ...blockProps }>
            <InspectorControls>
                <TabPanel
                    className="axis-folio-tabs"
                    activeClass="is-active"
                    tabs={ [
                        { name: 'settings', title: __( 'Settings', 'axis-folio' ) },
                        { name: 'styles', title: __( 'Styles', 'axis-folio' ) },
                    ] }
                >
                    { ( tab ) => (
                        <>
                            { tab.name === 'settings' && (
                                <>
                                    <PanelBody title={ __( 'Grid Layout', 'axis-folio' ) }>
                                        <RangeControl label={ __( 'Columns (Desktop)', 'axis-folio' ) } value={ columnsDesktop } onChange={ ( v ) => setAttributes( { columnsDesktop: v } ) } min={ 1 } max={ 6 } />
                                        <RangeControl label={ __( 'Columns (tablet)', 'axis-folio' ) } value={ columnsTablet } onChange={ ( v ) => setAttributes( { columnsTablet: v } ) } min={ 1 } max={ 4 } />
                                        <RangeControl label={ __( 'Columns (mobile)', 'axis-folio' ) } value={ columnsMobile } onChange={ ( v ) => setAttributes( { columnsMobile: v } ) } min={ 1 } max={ 2 } />
                                        <RangeControl label={ __( 'Grid Gap', 'axis-folio' ) } value={ gridGap } onChange={ ( v ) => setAttributes( { gridGap: v } ) } min={ 0 } max={ 100 } />
                                    </PanelBody>
                                    <PanelBody title={ __( 'Pagination', 'axis-folio' ) }>
                                        <ToggleControl label={ __( 'Enable Load more', 'axis-folio' ) } checked={ enableLoadMore } onChange={ ( v ) => setAttributes( { enableLoadMore: v } ) } />
                                        <TextControl label={ __( 'Butten Text', 'axis-folio' ) } value={ loadMoreText } onChange={ ( v ) => setAttributes( { loadMoreText: v } ) } />
                                        <RangeControl label={ __( 'items per page', 'axis-folio' ) } value={ postsPerPage } onChange={ ( v ) => setAttributes( { postsPerPage: v } ) } min={ 1 } max={ 20 } />
                                    </PanelBody>
                                </>
                            ) }
                            { tab.name === 'styles' && (
                                <>
                                    <PanelBody title={ __( 'card appearence', 'axis-folio' ) }>
                                        <RangeControl label={ __( 'Card Border Radius', 'axis-folio' ) } value={ borderRadius } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } min={ 0 } max={ 50 } />
                                        <ToggleControl label={ __( 'enable box shadow', 'axis-folio' ) } checked={ hasShadow } onChange={ ( v ) => setAttributes( { hasShadow: v } ) } />
                                        <ToggleControl label={ __( 'show tags', 'axis-folio' ) } checked={ showTags } onChange={ ( v ) => setAttributes( { showTags: v } ) } />
                                        <ToggleControl label={ __( 'show divider above tags', 'axis-folio' ) } checked={ showTagDivider } onChange={ ( v ) => setAttributes( { showTagDivider: v } ) } />
                                        <RangeControl label={ __( 'Divider Width (%)', 'axis-folio' ) } value={ dividerWidth } onChange={ ( v ) => setAttributes( { dividerWidth: v } ) } min={ 1 } max={ 100 } />
                                        <RangeControl label={ __( 'Divider Height (px)', 'axis-folio' ) } value={ dividerHeight } onChange={ ( v ) => setAttributes( { dividerHeight: v } ) } min={ 1 } max={ 10 } />
                                    </PanelBody>

                                    <PanelBody title={ __( 'typography', 'axis-folio' ) } initialOpen={ false }>
                                        <p><strong>{ __( 'Title', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ titleFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { titleFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ titleFontSize } onChange={ ( v ) => setAttributes( { titleFontSize: v } ) } min={ 10 } max={ 100 } />
                                        <BoxControl
                                            label={ __( 'Padding', 'axis-folio' ) }
                                            values={ {
                                                top: titlePaddingTop ? `${ titlePaddingTop }px` : '0px',
                                                right: titlePaddingRight ? `${ titlePaddingRight }px` : '0px',
                                                bottom: titlePaddingBottom ? `${ titlePaddingBottom }px` : '0px',
                                                left: titlePaddingLeft ? `${ titlePaddingLeft }px` : '0px',
                                            } }
                                            onChange={ ( values ) => setAttributes( {
                                                titlePaddingTop: parseInt( values.top, 10 ) || 0,
                                                titlePaddingRight: parseInt( values.right, 10 ) || 0,
                                                titlePaddingBottom: parseInt( values.bottom, 10 ) || 0,
                                                titlePaddingLeft: parseInt( values.left, 10 ) || 0,
                                            } ) }
                                            units={ [ 'px' ] }
                                            inputProps={ { min: 0, max: 80 } }
                                        />
                                        <p><strong>{ __( 'description', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ descFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { descFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ descFontSize } onChange={ ( v ) => setAttributes( { descFontSize: v } ) } min={ 10 } max={ 100 } />
                                        <BoxControl
                                            label={ __( 'Padding', 'axis-folio' ) }
                                            values={ {
                                                top: descPaddingTop ? `${ descPaddingTop }px` : '0px',
                                                right: descPaddingRight ? `${ descPaddingRight }px` : '0px',
                                                bottom: descPaddingBottom ? `${ descPaddingBottom }px` : '0px',
                                                left: descPaddingLeft ? `${ descPaddingLeft }px` : '0px',
                                            } }
                                            onChange={ ( values ) => setAttributes( {
                                                descPaddingTop: parseInt( values.top, 10 ) || 0,
                                                descPaddingRight: parseInt( values.right, 10 ) || 0,
                                                descPaddingBottom: parseInt( values.bottom, 10 ) || 0,
                                                descPaddingLeft: parseInt( values.left, 10 ) || 0,
                                            } ) }
                                            units={ [ 'px' ] }
                                            inputProps={ { min: 0, max: 80 } }
                                        />
                                        <p><strong>{ __( 'tags', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ tagFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { tagFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ tagFontSize } onChange={ ( v ) => setAttributes( { tagFontSize: v } ) } min={ 8 } max={ 30 } />
                                        <RangeControl label={ __( 'border radius', 'axis-folio' ) } value={ tagBorderRadius } onChange={ ( v ) => setAttributes( { tagBorderRadius: v } ) } min={ 0 } max={ 50 } />
                                        <BoxControl
                                            label={ __( 'Padding', 'axis-folio' ) }
                                            values={ {
                                                top: tagPaddingTop ? `${ tagPaddingTop }px` : '0px',
                                                right: tagPaddingRight ? `${ tagPaddingRight }px` : '0px',
                                                bottom: tagPaddingBottom ? `${ tagPaddingBottom }px` : '0px',
                                                left: tagPaddingLeft ? `${ tagPaddingLeft }px` : '0px',
                                            } }
                                            onChange={ ( values ) => setAttributes( {
                                                tagPaddingTop: parseInt( values.top, 10 ) || 0,
                                                tagPaddingRight: parseInt( values.right, 10 ) || 0,
                                                tagPaddingBottom: parseInt( values.bottom, 10 ) || 0,
                                                tagPaddingLeft: parseInt( values.left, 10 ) || 0,
                                            } ) }
                                            units={ [ 'px' ] }
                                            inputProps={ { min: 0, max: 80 } }
                                        />
                                    </PanelBody>

                                    <PanelBody title={ __( 'image controls', 'axis-folio' ) } initialOpen={ false }>
                                        <ToggleControl label={ __( 'enable image zoom', 'axis-folio' ) } checked={ hasZoom } onChange={ ( v ) => setAttributes( { hasZoom: v } ) } />
                                        <RangeControl label={ __( 'zoom scall', 'axis-folio' ) } value={ zoomScale } onChange={ ( v ) => setAttributes( { zoomScale: v } ) } min={ 1 } max={ 2 } step={ 0.1 } />
                                    </PanelBody>

                                    <PanelBody title={ __( 'butten styles', 'axis-folio' ) } initialOpen={ false }>
                                        <RangeControl label={ __( 'Button Border Radius', 'axis-folio' ) } value={ btnBorderRadius } onChange={ ( v ) => setAttributes( { btnBorderRadius: v } ) } min={ 0 } max={ 50 } />
                                    </PanelBody>

                                    <PanelBody title={ __( 'shadow controls', 'axis-folio' ) } initialOpen={ false }>
                                        <p><strong>{ __( 'Standard State', 'axis-folio' ) }</strong></p>
                                        <RangeControl label={ __( 'Blur', 'axis-folio' ) } value={ shadowBlur } onChange={ ( v ) => setAttributes( { shadowBlur: v } ) } min={ 0 } max={ 50 } />
                                        <RangeControl label={ __( 'Spread', 'axis-folio' ) } value={ shadowSpread } onChange={ ( v ) => setAttributes( { shadowSpread: v } ) } min={ -20 } max={ 50 } />
                                        <RangeControl label={ __( 'Offset X', 'axis-folio' ) } value={ shadowX } onChange={ ( v ) => setAttributes( { shadowX: v } ) } min={ -50 } max={ 50 } />
                                        <RangeControl label={ __( 'Offset Y', 'axis-folio' ) } value={ shadowY } onChange={ ( v ) => setAttributes( { shadowY: v } ) } min={ -50 } max={ 50 } />
                                        <p><strong>{ __( 'Hover State', 'axis-folio' ) }</strong></p>
                                        <RangeControl label={ __( 'Hover Blur', 'axis-folio' ) } value={ hShadowBlur } onChange={ ( v ) => setAttributes( { hShadowBlur: v } ) } min={ 0 } max={ 50 } />
                                        <RangeControl label={ __( 'Hover Spread', 'axis-folio' ) } value={ hShadowSpread } onChange={ ( v ) => setAttributes( { hShadowSpread: v } ) } min={ -20 } max={ 50 } />
                                        <RangeControl label={ __( 'Hover Offset X', 'axis-folio' ) } value={ hShadowX } onChange={ ( v ) => setAttributes( { hShadowX: v } ) } min={ -50 } max={ 50 } />
                                        <RangeControl label={ __( 'Hover Offset Y', 'axis-folio' ) } value={ hShadowY } onChange={ ( v ) => setAttributes( { hShadowY: v } ) } min={ -50 } max={ 50 } />
                                    </PanelBody>

                                    <PanelColorSettings
                                        title={ __( 'Color Palette', 'axis-folio' ) }
                                        initialOpen={ false }
                                        colorSettings={ [
                                            { label: __( 'card background', 'axis-folio' ), value: cardBgColor, onChange: ( v ) => setAttributes( { cardBgColor: v } ) },
                                            { label: __( 'hover card background', 'axis-folio' ), value: hCardBgColor, onChange: ( v ) => setAttributes( { hCardBgColor: v } ) },
                                            { label: __( 'shadow color', 'axis-folio' ), value: shadowColor, onChange: ( v ) => setAttributes( { shadowColor: v } ) },
                                            { label: __( 'hover shadow color', 'axis-folio' ), value: hShadowColor, onChange: ( v ) => setAttributes( { hShadowColor: v } ) },
                                            { label: __( 'tag background', 'axis-folio' ), value: tagBgColor, onChange: ( v ) => setAttributes( { tagBgColor: v } ) },
                                            { label: __( 'tag text color', 'axis-folio' ), value: tagTextColor, onChange: ( v ) => setAttributes( { tagTextColor: v } ) },
                                            { label: __( 'divider color', 'axis-folio' ), value: dividerColor, onChange: ( v ) => setAttributes( { dividerColor: v } ) },
                                            { label: __( 'button backgount', 'axis-folio' ), value: btnBgColor, onChange: ( v ) => setAttributes( { btnBgColor: v } ) },
                                            { label: __( 'button text color', 'axis-folio' ), value: btnTextColor, onChange: ( v ) => setAttributes( { btnTextColor: v } ) },
                                            { label: __( 'button hover backgount', 'axis-folio' ), value: btnHovBgColor, onChange: ( v ) => setAttributes( { btnHovBgColor: v } ) },
                                            { label: __( 'button hover text color', 'axis-folio' ), value: btnHovTextColor, onChange: ( v ) => setAttributes( { btnHovTextColor: v } ) },
                                        ] }
                                    />
                                </>
                            ) }
                        </>
                    ) }
                </TabPanel>
            </InspectorControls>

            <div style={ editorStyles.containerLayout }>
                <div style={ editorStyles.gridContainer }>
                    { safeItems.map( ( item, index ) => {
                        const itemTags = String( item.tags ?? '' );
                        const tagsArray = itemTags.split( ',' ).map( ( t ) => t.trim() ).filter( Boolean );
                        const previewBgColor = hoveredIndex === index
                            ? ( hCardBgColor || cardBgColor || editorStyles.previewSection.backgroundColor )
                            : ( cardBgColor || editorStyles.previewSection.backgroundColor );
                        return (
                            <div 
                                key={ index } 
                                className="item-card-wrapper"
                                style={ { ...getCardStyle( index ), opacity: draggedIndex === index ? 0.5 : 1 } }
                                onMouseEnter={ () => setHoveredIndex( index ) }
                                onMouseLeave={ () => setHoveredIndex( null ) }
                            >
                                <div style={ { ...editorStyles.previewSection, backgroundColor: previewBgColor } }>
                                <div style={ editorStyles.previewHeading }>{ __( 'PREVIEW', 'axis-folio' ) }</div>
                                <div style={ { padding: '0 18px 10px', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 } }>
                                    <div
                                        onMouseDown={ (e) => handleDragHandleMouseDown( e, index ) }
                                        onMouseEnter={ () => handleMouseEnterCard( index ) }
                                        style={ { cursor: draggedIndex === null ? 'grab' : draggedIndex === index ? 'grabbing' : 'grab', padding: '4px 8px', display: 'flex', alignItems: 'center' } }
                                        title="Drag to reorder"
                                    >
                                        <Dashicon icon="menu" size={ 20 } style={ { color: '#666' } } />
                                    </div>
                                    <Button isDestructive onClick={ () => removeItem( index ) } icon="trash" />
                                </div>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                        allowedTypes={ [ 'image' ] }
                                        render={ ( { open } ) => (
                                            <>
                                                <div style={ { ...editorStyles.imageWrapper, backgroundColor: previewBgColor } } onClick={ open }>
                                                    { item.url 
                                                        ? <img src={ item.url } style={ editorStyles.image( index ) } alt="" /> 
                                                        : <div style={ { padding: '40px', textAlign: 'center' } }><Dashicon icon="format-image" /></div> 
                                                    }
                                                </div>
                                                <div style={ { marginTop: '12px', textAlign: 'center', background: 'transparent', padding: '0 18px' } }>
                                                    <Button variant="secondary" onClick={ open }>
                                                        { item.url ? __( 'Change Image', 'axis-folio' ) : __( 'Upload Image', 'axis-folio' ) }
                                                    </Button>
                                                </div>
                                            </>
                                        ) }
                                    />
                                </MediaUploadCheck>
                                <div style={ editorStyles.cardContent }>
                                    <div style={ { marginBottom: '8px' } }>
                                        <div style={ { fontFamily: titleFontFamily, fontSize: `${ titleFontSize }px`, fontWeight: '700', color: titleColor, marginBottom: '6px', padding: buildPadding( titlePaddingTop, titlePaddingRight, titlePaddingBottom, titlePaddingLeft, 0 ) } }>
                                            { item.title || __( 'Title', 'axis-folio' ) }
                                        </div>
                                        <div style={ { fontFamily: descFontFamily, fontSize: `${ descFontSize }px`, color: descColor, marginBottom: '12px', padding: buildPadding( descPaddingTop, descPaddingRight, descPaddingBottom, descPaddingLeft, 0 ) } }>
                                            { item.description || __( 'Description', 'axis-folio' ) }
                                        </div>
                                        { showTagDivider && tagsArray.length > 0 && (
                                            <div style={ editorStyles.divider }></div>
                                        ) }
                                        { showTags && tagsArray.length > 0 && (
                                            <div style={ { display: 'flex', flexWrap: 'wrap', gap: '6px', padding: buildPadding( tagPaddingTop, tagPaddingRight, tagPaddingBottom, tagPaddingLeft, 0 ) } }>
                                                { tagsArray.map( ( t, i ) => (
                                                    <span key={ i } style={ editorStyles.tagItem }>{ t }</span>
                                                ) ) }
                                            </div>
                                        ) }
                                    </div>
                                </div>
                            </div>
                            <div style={ editorStyles.editSection }>
                                <div style={ editorStyles.sectionHeading }>{ __( 'Edit', 'axis-folio' ) }</div>
                                <div style={ { display: 'grid', gap: '16px' } }>
                                    <div style={ { borderTop: '1px solid #e6e6e6', paddingTop: '16px' } }>
                                        <TextControl placeholder="Title" value={ item.title } onChange={ ( v ) => updateItem( index, 'title', v ) } />
                                    </div>
                                    <div style={ { borderTop: '1px solid #e6e6e6', paddingTop: '16px' } }>
                                        <TextareaControl placeholder="Description" value={ item.description } onChange={ ( v ) => updateItem( index, 'description', v ) } />
                                    </div>
                                    <div style={ { borderTop: '1px solid #e6e6e6', paddingTop: '16px' } }>
                                        <TextControl label="Link URL" placeholder="https://..." value={ item.linkUrl } onChange={ ( v ) => updateItem( index, 'linkUrl', v ) } />
                                        <ToggleControl label="Open in New Tab" checked={ item.openInNewTab } onChange={ ( v ) => updateItem( index, 'openInNewTab', v ) } />
                                        <TextControl label="Tags (Comma Separated)" placeholder="Design, Web, App" value={ itemTags } onChange={ ( v ) => updateItem( index, 'tags', v ) } />
                                    </div>
                                </div>
                            </div>
                            </div>
                        );
                    } ) }
                </div>
                
                <div style={ { marginTop: '40px', textAlign: 'center', width: '100%' } }>
                    <Button variant="primary" onClick={ addNewItem } icon="plus">
                        { __( 'Add Portfolio Item', 'axis-folio' ) }
                    </Button>

                    { enableLoadMore && (
                        <div style={ { marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '20px', width: '100%' } }>
                            <div 
                                style={ editorStyles.loadMorePreview }
                                onMouseEnter={ () => setIsBtnHovered( true ) }
                                onMouseLeave={ () => setIsBtnHovered( false ) }
                            >
                                { loadMoreText || __( 'Load More', 'axis-folio' ) }
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
}