import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings 
} from '@wordpress/block-editor';
import { 
    PanelBody, Button, TextControl, TextareaControl, Dashicon, 
    RangeControl, ToggleControl, ColorPalette, ColorPicker, BaseControl
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { 
        uniqueId, items, columnsDesktop, columnsTablet, columnsMobile, gridGap,
        borderRadius, hasShadow, shadowColor, showTags, showTagLine, cardBgColor,
        tagBgColor, tagTextColor, hasZoom, zoomScale 
    } = attributes;

    useEffect( () => {
        if ( ! uniqueId ) {
            setAttributes( { uniqueId: `masionary-${ clientId.substring( 0, 8 ) }` } );
        }
    }, [ uniqueId, clientId, setAttributes ] );

    const updateItem = ( index, key, value ) => {
        const newItems = [ ...items ];
        newItems[ index ] = { ...newItems[ index ], [ key ]: value };
        setAttributes( { items: newItems } );
    };

    return (
        <div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title={ __( 'Grid Layout', 'masionary' ) }>
                    <RangeControl label={ __( 'Grid Gap', 'masionary' ) } value={ gridGap } onChange={ ( val ) => setAttributes( { gridGap: val } ) } min={ 0 } max={ 50 } />
                    <RangeControl label={ __( 'Columns (Desktop)', 'masionary' ) } value={ columnsDesktop } onChange={ ( val ) => setAttributes( { columnsDesktop: val } ) } min={ 1 } max={ 6 } />
                    <RangeControl label={ __( 'Columns (Tablet)', 'masionary' ) } value={ columnsTablet } onChange={ ( val ) => setAttributes( { columnsTablet: val } ) } min={ 1 } max={ 4 } />
                    <RangeControl label={ __( 'Columns (Mobile)', 'masionary' ) } value={ columnsMobile } onChange={ ( val ) => setAttributes( { columnsMobile: val } ) } min={ 1 } max={ 2 } />
                </PanelBody>
                <PanelBody title={ __( 'Content Settings', 'masionary' ) }>
                    <ToggleControl label={ __( 'Show Tags', 'masionary' ) } checked={ showTags } onChange={ ( val ) => setAttributes( { showTags: val } ) } />
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                <PanelBody title={ __( 'Card Appearance', 'masionary' ) }>
                    <BaseControl label={ __( 'Background Color', 'masionary' ) }>
                        <ColorPalette value={ cardBgColor } onChange={ ( val ) => setAttributes( { cardBgColor: val } ) } />
                    </BaseControl>
                    <RangeControl label={ __( 'Border Radius', 'masionary' ) } value={ borderRadius } onChange={ ( val ) => setAttributes( { borderRadius: val } ) } min={ 0 } max={ 100 } />
                    <ToggleControl label={ __( 'Drop Shadow', 'masionary' ) } checked={ hasShadow } onChange={ ( val ) => setAttributes( { hasShadow: val } ) } />
                    { hasShadow && (
                        <BaseControl label={ __( 'Shadow Color', 'masionary' ) }>
                            <ColorPicker color={ shadowColor || 'rgba(0,0,0,0.1)' } onChange={ ( val ) => setAttributes( { shadowColor: val } ) } enableAlpha copyFormat="rgba" />
                        </BaseControl>
                    ) }
                    <hr />
                    <ToggleControl label={ __( 'Enable Image Zoom', 'masionary' ) } checked={ hasZoom } onChange={ ( val ) => setAttributes( { hasZoom: val } ) } />
                    { hasZoom && <RangeControl label={ __( 'Zoom Intensity', 'masionary' ) } value={ zoomScale } onChange={ ( val ) => setAttributes( { zoomScale: val } ) } min={ 1 } max={ 1.5 } step={ 0.01 } /> }
                </PanelBody>

                { showTags && (
                    <>
                    <PanelBody title={ __( 'Tag Settings', 'masionary' ) }>
                        <ToggleControl label={ __( 'Separator Line Above Tags', 'masionary' ) } checked={ showTagLine } onChange={ ( val ) => setAttributes( { showTagLine: val } ) } />
                    </PanelBody>
                    <PanelColorSettings
                        title={ __( 'Tag Colors', 'masionary' ) }
                        initialOpen={ false }
                        colorSettings={ [
                            { value: tagBgColor, onChange: ( val ) => setAttributes( { tagBgColor: val } ), label: __( 'Tag Background', 'masionary' ) },
                            { value: tagTextColor, onChange: ( val ) => setAttributes( { tagTextColor: val } ), label: __( 'Tag Text', 'masionary' ) },
                        ] }
                    />
                    </>
                ) }
            </InspectorControls>

            <div className="portfolio-grid-editor">
                { items.map( ( item, index ) => (
                    <div key={ index } className="item-card-wrapper" style={ { 
                        background: cardBgColor, border: '1px solid #e0e0e0', padding: '15px', marginBottom: '15px', borderRadius: `${borderRadius}px`,
                        boxShadow: hasShadow ? `0 4px 12px ${shadowColor || 'rgba(0,0,0,0.1)'}` : 'none'
                    } }>
                        <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' } }>
                            <span style={ { fontSize: '10px', fontWeight: 'bold', color: '#888' } }>ITEM { index + 1 }</span>
                            <Button isDestructive variant="link" onClick={ () => setAttributes({ items: items.filter((_, i) => i !== index) }) }>
                                <Dashicon icon="trash" />
                            </Button>
                        </div>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                allowedTypes={ [ 'image' ] }
                                render={ ( { open } ) => (
                                    <div onClick={ open } style={ { background: '#f7f7f7', border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '15px' } }>
                                        { item.url ? <img src={ item.url } style={ { maxHeight: '100px' } } alt="" /> : <span>Upload Image</span> }
                                    </div>
                                ) }
                            />
                        </MediaUploadCheck>
                        <TextControl placeholder="Title" value={ item.title } onChange={ ( val ) => updateItem( index, 'title', val ) } />
                        <TextareaControl placeholder="Description" value={ item.description } onChange={ ( val ) => updateItem( index, 'description', val ) } />
                        <TextControl placeholder="Tags" value={ item.tags } onChange={ ( val ) => updateItem( index, 'tags', val ) } />
                    </div>
                ) ) }
                <Button isPrimary onClick={ () => setAttributes({ items: [...items, { title: '', description: '', url: '', tags: '' }] }) } style={ { width: '100%', justifyContent: 'center' } }>
                    Add New Item
                </Button>
            </div>
        </div>
    );
}