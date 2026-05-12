import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck, 
    PanelColorSettings 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    Button, 
    TextControl, 
    TextareaControl, 
    Dashicon, 
    RangeControl, 
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { 
        uniqueId, items = [], columnsDesktop, columnsTablet, columnsMobile, gridGap,
        borderRadius, hasShadow, cardBgColor, hCardBgColor,
        titleColor, descColor, tagBgColor, tagTextColor, tagFontSize,
        showTags,
        enableLoadMore, postsPerPage, loadMoreText, btnBgColor, btnTextColor,
        btnHovBgColor, btnHovTextColor, btnBorderRadius,
        hasZoom, zoomScale,
        shadowX, shadowY, shadowBlur, shadowSpread, shadowColor,
        hShadowX, hShadowY, hShadowBlur, hShadowSpread, hShadowColor,
        showTagDivider, dividerWidth, dividerHeight, dividerColor,
        titleFontFamily, descFontFamily, tagFontFamily,
        titleFontSize, descFontSize
    } = attributes;

    useEffect( () => {
        if ( ! uniqueId ) {
            setAttributes( { uniqueId: `af-${ clientId.substring( 0, 8 ) }` } );
        }
    }, [ uniqueId, clientId, setAttributes ] );

    const updateItem = ( index, key, value ) => {
        const newItems = [ ...items ];
        newItems[ index ] = { ...newItems[ index ], [ key ]: value };
        setAttributes( { items: newItems } );
    };

    const removeItem = ( index ) => {
        const newItems = items.filter( ( _, i ) => i !== index );
        setAttributes( { items: newItems } );
    };

    const addNewItem = () => {
        setAttributes( { items: [ ...items, { title: '', description: '', url: '', tags: '' } ] } );
    };

    const fontOptions = [
        { label: 'Default', value: 'inherit' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' }
    ];

    const editorStyles = {
        container: { padding: '25px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
        masonryGrid: { columnCount: columnsDesktop, columnGap: `${gridGap}px`, width: '100%', display: 'block' },
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
        imageWrapper: { width: '100%', overflow: 'hidden', borderRadius: '4px', marginBottom: '15px', backgroundColor: '#e5e5e5', display: 'block', cursor: 'pointer', lineHeight: 0 },
        image: { width: '100%', height: 'auto !important', display: 'block', transition: 'transform 0.5s ease' },
        tagItem: {
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: '600',
            textTransform: 'uppercase',
            backgroundColor: tagBgColor,
            color: tagTextColor,
            fontSize: `${tagFontSize}px`,
            fontFamily: tagFontFamily,
            display: 'inline-block',
            marginRight: '5px',
            marginBottom: '5px'
        },
        divider: {
            width: `${dividerWidth}%`,
            height: `${dividerHeight}px`,
            backgroundColor: dividerColor || '#eee',
            margin: '10px 0',
            display: showTagDivider ? 'block' : 'none'
        },
        header: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' },
        footer: { textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee', width: '100%', clear: 'both', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
        loadMorePreview: { padding: '10px 25px', borderRadius: `${btnBorderRadius}px`, backgroundColor: btnBgColor, color: btnTextColor, fontWeight: '600', fontSize: '14px', display: 'inline-block', cursor: 'pointer', marginTop: '10px', border: 'none', transition: 'all 0.3s ease' }
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
        #${uniqueId}-editor .portfolio-load-more-preview:hover {
            background: ${btnHovBgColor} !important;
            color: ${btnHovTextColor} !important;
        }
        /* Style overrides for Gutenberg inputs to show live font changes */
        #${uniqueId}-editor .portfolio-title-input input {
            color: ${titleColor} !important;
            font-size: ${titleFontSize}px !important;
            font-family: ${titleFontFamily} !important;
            font-weight: 700;
        }
        #${uniqueId}-editor .portfolio-desc-input textarea {
            color: ${descColor} !important;
            font-size: ${descFontSize}px !important;
            font-family: ${descFontFamily} !important;
        }
    `;

    return (
        <div { ...useBlockProps() }>
            <style>{ hoverCSS }</style>
            
            <InspectorControls>
                <PanelBody title={ __( 'Grid Layout', 'axis-folio' ) }>
                    <RangeControl label="Columns (Desktop)" value={ columnsDesktop } onChange={ ( val ) => setAttributes( { columnsDesktop: val } ) } min={ 1 } max={ 6 } />
                    <RangeControl label="Columns (Tablet)" value={ columnsTablet } onChange={ ( val ) => setAttributes( { columnsTablet: val } ) } min={ 1 } max={ 4 } />
                    <RangeControl label="Columns (Mobile)" value={ columnsMobile } onChange={ ( val ) => setAttributes( { columnsMobile: val } ) } min={ 1 } max={ 2 } />
                    <RangeControl label="Grid Gap" value={ gridGap } onChange={ ( val ) => setAttributes( { gridGap: val } ) } min={ 0 } max={ 50 } />
                </PanelBody>
                <PanelBody title={ __( 'Pagination', 'axis-folio' ) }>
                    <ToggleControl label="Enable Load More" checked={ enableLoadMore } onChange={ ( val ) => setAttributes( { enableLoadMore: val } ) } />
                    { enableLoadMore && (
                        <>
                            <TextControl label="Button Text" value={ loadMoreText } onChange={ ( val ) => setAttributes( { loadMoreText: val } ) } />
                            <RangeControl label="Items Per Page" value={ postsPerPage } onChange={ ( val ) => setAttributes( { postsPerPage: val } ) } min={ 1 } max={ 20 } />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                <PanelBody title={ __( 'Card Appearance', 'axis-folio' ) }>
                    <RangeControl label="Card Border Radius" value={ borderRadius } onChange={ ( val ) => setAttributes( { borderRadius: val } ) } min={ 0 } max={ 50 } />
                    <ToggleControl label="Enable Box Shadow" checked={ hasShadow } onChange={ ( val ) => setAttributes( { hasShadow: val } ) } />
                    <ToggleControl label="Show Tags" checked={ showTags } onChange={ ( val ) => setAttributes( { showTags: val } ) } />
                    { showTags && (
                        <>
                            <ToggleControl label="Show Divider Above Tags" checked={ showTagDivider } onChange={ ( val ) => setAttributes( { showTagDivider: val } ) } />
                            { showTagDivider && (
                                <>
                                    <RangeControl label="Divider Width (%)" value={ dividerWidth } onChange={ ( val ) => setAttributes( { dividerWidth: val } ) } min={ 10 } max={ 100 } />
                                    <RangeControl label="Divider Height (px)" value={ dividerHeight } onChange={ ( val ) => setAttributes( { dividerHeight: val } ) } min={ 1 } max={ 10 } />
                                </>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={ __( 'Typography', 'axis-folio' ) } initialOpen={ false }>
                    <p><strong>{ __( 'Title', 'axis-folio' ) }</strong></p>
                    <SelectControl label="Font Family" value={ titleFontFamily } options={ fontOptions } onChange={ ( val ) => setAttributes( { titleFontFamily: val } ) } />
                    <RangeControl label="Font Size" value={ titleFontSize } onChange={ ( val ) => setAttributes( { titleFontSize: val } ) } min={ 10 } max={ 100 } />
                    <hr />
                    <p><strong>{ __( 'Description', 'axis-folio' ) }</strong></p>
                    <SelectControl label="Font Family" value={ descFontFamily } options={ fontOptions } onChange={ ( val ) => setAttributes( { descFontFamily: val } ) } />
                    <RangeControl label="Font Size" value={ descFontSize } onChange={ ( val ) => setAttributes( { descFontSize: val } ) } min={ 10 } max={ 50 } />
                    <hr />
                    <p><strong>{ __( 'Tags', 'axis-folio' ) }</strong></p>
                    <SelectControl label="Font Family" value={ tagFontFamily } options={ fontOptions } onChange={ ( val ) => setAttributes( { tagFontFamily: val } ) } />
                    <RangeControl label="Font Size" value={ tagFontSize } onChange={ ( val ) => setAttributes( { tagFontSize: val } ) } min={ 8 } max={ 30 } />
                </PanelBody>

                <PanelBody title={ __( 'Image Controls', 'axis-folio' ) } initialOpen={ false }>
                    <ToggleControl label="Enable Image Zoom" checked={ hasZoom } onChange={ ( val ) => setAttributes( { hasZoom: val } ) } />
                    { hasZoom && (
                        <RangeControl label="Zoom Scale" value={ zoomScale } onChange={ ( val ) => setAttributes( { zoomScale: val } ) } min={ 1 } max={ 2 } step={ 0.01 } />
                    )}
                </PanelBody>

                { enableLoadMore && (
                    <PanelBody title={ __( 'Button Styles', 'axis-folio' ) } initialOpen={ false }>
                        <RangeControl label="Button Border Radius" value={ btnBorderRadius } onChange={ ( val ) => setAttributes( { btnBorderRadius: val } ) } min={ 0 } max={ 50 } />
                    </PanelBody>
                )}

                { hasShadow && (
                    <PanelBody title={ __( 'Shadow Controls', 'axis-folio' ) } initialOpen={ false }>
                        <p><strong>{ __( 'Standard State', 'axis-folio' ) }</strong></p>
                        <RangeControl label="Blur" value={ shadowBlur } onChange={ ( val ) => setAttributes( { shadowBlur: val } ) } min={ 0 } max={ 100 } />
                        <RangeControl label="Spread" value={ shadowSpread } onChange={ ( val ) => setAttributes( { shadowSpread: val } ) } min={ -20 } max={ 50 } />
                        <RangeControl label="Offset X" value={ shadowX } onChange={ ( val ) => setAttributes( { shadowX: val } ) } min={ -50 } max={ 50 } />
                        <RangeControl label="Offset Y" value={ shadowY } onChange={ ( val ) => setAttributes( { shadowY: val } ) } min={ -50 } max={ 50 } />
                        <hr style={{ margin: '20px 0' }} />
                        <p><strong>{ __( 'Hover State', 'axis-folio' ) }</strong></p>
                        <RangeControl label="Hover Blur" value={ hShadowBlur } onChange={ ( val ) => setAttributes( { hShadowBlur: val } ) } min={ 0 } max={ 100 } />
                        <RangeControl label="Hover Spread" value={ hShadowSpread } onChange={ ( val ) => setAttributes( { hShadowSpread: val } ) } min={ -20 } max={ 50 } />
                        <RangeControl label="Hover Offset X" value={ hShadowX } onChange={ ( val ) => setAttributes( { hShadowX: val } ) } min={ -50 } max={ 50 } />
                        <RangeControl label="Hover Offset Y" value={ hShadowY } onChange={ ( val ) => setAttributes( { hShadowY: val } ) } min={ -50 } max={ 50 } />
                    </PanelBody>
                )}

                <PanelColorSettings
                    title={ __( 'Color Palette', 'axis-folio' ) }
                    initialOpen={ false }
                    colorSettings={ [
                        { value: cardBgColor, onChange: ( val ) => setAttributes( { cardBgColor: val } ), label: "Card Background" },
                        { value: hCardBgColor, onChange: ( val ) => setAttributes( { hCardBgColor: val } ), label: "Hover Card Background" },
                        { value: shadowColor, onChange: ( val ) => setAttributes( { shadowColor: val } ), label: "Shadow Color" },
                        { value: hShadowColor, onChange: ( val ) => setAttributes( { hShadowColor: val } ), label: "Hover Shadow Color" },
                        { value: tagBgColor, onChange: ( val ) => setAttributes( { tagBgColor: val } ), label: "Tag Background" },
                        { value: tagTextColor, onChange: ( val ) => setAttributes( { tagTextColor: val } ), label: "Tag Text Color" },
                        { value: dividerColor, onChange: ( val ) => setAttributes( { dividerColor: val } ), label: "Divider Color" },
                        { value: btnBgColor, onChange: ( val ) => setAttributes( { btnBgColor: val } ), label: "Button Background" },
                        { value: btnTextColor, onChange: ( val ) => setAttributes( { btnTextColor: val } ), label: "Button Text Color" },
                        { value: btnHovBgColor, onChange: ( val ) => setAttributes( { btnHovBgColor: val } ), label: "Button Hover Background" },
                        { value: btnHovTextColor, onChange: ( val ) => setAttributes( { btnHovTextColor: val } ), label: "Button Hover Text Color" },
                    ] }
                />
            </InspectorControls>

            <div id={ `${uniqueId}-editor` } className="portfolio-editor-wrapper" style={ editorStyles.container }>
                <div style={ editorStyles.masonryGrid }>
                    { items.map( ( item, index ) => (
                        <div key={ index } className="portfolio-edit-card" style={ editorStyles.card }>
                            <div style={ editorStyles.header }>
                                <strong style={{ color: '#111', fontSize: '11px', textTransform: 'uppercase' }}>ITEM { index + 1 }</strong>
                                <Button isDestructive icon="trash" onClick={ () => removeItem( index ) } />
                            </div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <div onClick={ open } style={ editorStyles.imageWrapper }>
                                            { item.url ? (
                                                <img src={ item.url } className="portfolio-edit-image" style={ editorStyles.image } alt="" />
                                            ) : (
                                                <div style={{ padding: '40px', textAlign: 'center' }}><Dashicon icon="format-image" /></div>
                                            ) }
                                        </div>
                                    ) }
                                />
                            </MediaUploadCheck>
                            
                            <div className="portfolio-title-input">
                                <TextControl 
                                    label={ __( "Title", "axis-folio" ) } 
                                    value={ item.title } 
                                    onChange={ ( val ) => updateItem( index, 'title', val ) } 
                                />
                            </div>

                            <div className="portfolio-desc-input">
                                <TextareaControl 
                                    label={ __( "Description", "axis-folio" ) } 
                                    value={ item.description } 
                                    onChange={ ( val ) => updateItem( index, 'description', val ) } 
                                />
                            </div>
                            
                            <TextControl label={ __( "Tags (Comma separated)", "axis-folio" ) } value={ item.tags } onChange={ ( val ) => updateItem( index, 'tags', val ) } />
                            
                            { showTagDivider && <div style={ editorStyles.divider }></div> }

                            { showTags && item.tags && (
                                <div style={{ marginTop: '10px' }}>
                                    { item.tags.split(',').map( ( tag, i ) => (
                                        <span key={ i } style={ editorStyles.tagItem }>
                                            { tag.trim() }
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) ) }
                </div>
                
                <div style={ editorStyles.footer }>
                    <Button isPrimary icon="plus" onClick={ addNewItem }>
                        { __( 'Add New Item', 'axis-folio' ) }
                    </Button>

                    { enableLoadMore && (
                        <div style={{ borderTop: '1px dashed #ccc', width: '100%', marginTop: '10px', paddingTop: '20px' }}>
                            <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>
                                { __( 'Load More Preview', 'axis-folio' ) }
                            </p>
                            <div className="portfolio-load-more-preview" style={ editorStyles.loadMorePreview }>
                                { loadMoreText || __( 'Load More', 'axis-folio' ) }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}