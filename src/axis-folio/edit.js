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
    SelectControl,
    TabPanel
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

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

    // Local state for editor hover previews
    const [ hoveredIndex, setHoveredIndex ] = useState( null );
    const [ isBtnHovered, setIsBtnHovered ] = useState( false );

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
        setAttributes( { items: [ ...items, { title: '', description: '', url: '', tags: '', linkUrl: '', openInNewTab: false } ] } );
    };

    const fontOptions = [
        { label: 'Default', value: 'inherit' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Times New Roman', value: 'Times New Roman, serif' },
        { label: 'Verdana', value: 'Verdana, sans-serif' }
    ];

    const getCardStyle = ( index ) => {
        const isHovered = hoveredIndex === index;
        return {
            background: isHovered ? hCardBgColor : cardBgColor,
            borderRadius: `${borderRadius}px`,
            transition: 'all 0.3s ease',
            boxShadow: hasShadow 
                ? ( isHovered 
                    ? `${hShadowX}px ${hShadowY}px ${hShadowBlur}px ${hShadowSpread}px ${hShadowColor}`
                    : `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` )
                : 'none',
            border: '1px solid #ddd',
            overflow: 'hidden'
        };
    };

    const editorStyles = {
        container: { padding: '20px', background: '#fff', width: '100%' },
        masonryGrid: { 
            display: 'grid', 
            gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`, 
            gap: `${gridGap}px`,
            width: '100%' 
        },
        imageWrapper: { width: '100%', backgroundColor: '#eee', minHeight: '150px', cursor: 'pointer', overflow: 'hidden' },
        image: ( index ) => ( { 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            transition: 'transform 0.3s ease',
            transform: ( hasZoom && hoveredIndex === index ) ? `scale(${zoomScale})` : 'scale(1)'
        } ),
        tagItem: {
            padding: '2px 8px',
            borderRadius: '3px',
            backgroundColor: tagBgColor,
            color: tagTextColor,
            fontSize: `${tagFontSize}px`,
            fontFamily: tagFontFamily,
            display: 'inline-block',
            marginRight: '5px'
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
            transition: 'all 0.3s ease',
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
        <div { ...useBlockProps() }>
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
                                    <PanelBody title={ __( 'Card Appearance', 'axis-folio' ) }>
                                        <RangeControl label={ __( 'Card Border Radius', 'axis-folio' ) } value={ borderRadius } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } min={ 0 } max={ 50 } />
                                        <ToggleControl label={ __( 'enable box shadow', 'axis-folio' ) } checked={ hasShadow } onChange={ ( v ) => setAttributes( { hasShadow: v } ) } />
                                        <ToggleControl label={ __( 'show tags', 'axis-folio' ) } checked={ showTags } onChange={ ( v ) => setAttributes( { showTags: v } ) } />
                                        <ToggleControl label={ __( 'show divider above tags', 'axis-folio' ) } checked={ showTagDivider } onChange={ ( v ) => setAttributes( { showTagDivider: v } ) } />
                                        <RangeControl label={ __( 'Divider Width (%)', 'axis-folio' ) } value={ dividerWidth } onChange={ ( v ) => setAttributes( { dividerWidth: v } ) } min={ 1 } max={ 100 } />
                                        <RangeControl label={ __( 'Divider Height (px)', 'axis-folio' ) } value={ dividerHeight } onChange={ ( v ) => setAttributes( { dividerHeight: v } ) } min={ 1 } max={ 10 } />
                                    </PanelBody>

                                    <PanelBody title={ __( 'Typography', 'axis-folio' ) } initialOpen={ false }>
                                        <p><strong>{ __( 'Title', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ titleFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { titleFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ titleFontSize } onChange={ ( v ) => setAttributes( { titleFontSize: v } ) } min={ 10 } max={ 100 } />
                                        <p><strong>{ __( 'description', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ descFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { descFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ descFontSize } onChange={ ( v ) => setAttributes( { descFontSize: v } ) } min={ 10 } max={ 100 } />
                                        <p><strong>{ __( 'tags', 'axis-folio' ) }</strong></p>
                                        <SelectControl label={ __( 'font family', 'axis-folio' ) } value={ tagFontFamily } options={ fontOptions } onChange={ ( v ) => setAttributes( { tagFontFamily: v } ) } />
                                        <RangeControl label={ __( 'font size', 'axis-folio' ) } value={ tagFontSize } onChange={ ( v ) => setAttributes( { tagFontSize: v } ) } min={ 8 } max={ 30 } />
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

            <div style={ editorStyles.container }>
                <div style={ editorStyles.masonryGrid }>
                    { items.map( ( item, index ) => (
                        <div 
                            key={ index } 
                            style={ getCardStyle( index ) }
                            onMouseEnter={ () => setHoveredIndex( index ) }
                            onMouseLeave={ () => setHoveredIndex( null ) }
                        >
                            <div style={ { padding: '10px', background: '#f1f1f1', display: 'flex', justifyContent: 'flex-end' } }>
                                <Button isDestructive onClick={ () => removeItem( index ) } icon="trash" />
                            </div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <div style={ editorStyles.imageWrapper } onClick={ open }>
                                            { item.url 
                                                ? <img src={ item.url } style={ editorStyles.image( index ) } alt="" /> 
                                                : <div style={ { padding: '40px', textAlign: 'center' } }><Dashicon icon="format-image" /></div> 
                                            }
                                        </div>
                                    ) }
                                />
                            </MediaUploadCheck>
                            <div style={ { padding: '15px' } }>
                                <TextControl placeholder="Title" value={ item.title } onChange={ ( v ) => updateItem( index, 'title', v ) } />
                                <TextareaControl placeholder="Description" value={ item.description } onChange={ ( v ) => updateItem( index, 'description', v ) } />
                                <TextControl placeholder="Link URL" value={ item.linkUrl } onChange={ ( v ) => updateItem( index, 'linkUrl', v ) } />
                                <ToggleControl label="Open in New Tab" checked={ item.openInNewTab } onChange={ ( v ) => updateItem( index, 'openInNewTab', v ) } />
                                <TextControl placeholder="Tags (comma separated)" value={ item.tags } onChange={ ( v ) => updateItem( index, 'tags', v ) } />
                                
                                { showTagDivider && item.tags && ( <div style={ editorStyles.divider }></div> ) }
                                
                                { showTags && item.tags && (
                                    <div style={ { marginTop: '10px' } }>
                                        { item.tags.split( ',' ).map( ( t, i ) => (
                                            <span key={ i } style={ editorStyles.tagItem }>{ t.trim() }</span>
                                        ) ) }
                                    </div>
                                ) }
                            </div>
                        </div>
                    ) ) }
                </div>
                
                <div style={ { marginTop: '30px', textAlign: 'center' } }>
                    <Button variant="primary" onClick={ addNewItem } icon="plus">
                        { __( 'Add New Item', 'axis-folio' ) }
                    </Button>

                    { enableLoadMore && (
                        <div style={ { marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '20px' } }>
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