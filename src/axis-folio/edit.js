import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings 
} from '@wordpress/block-editor';
import { 
    PanelBody, Button, TextControl, TextareaControl, Dashicon, 
    RangeControl, ToggleControl, ColorPalette, ColorPicker, BaseControl, Tooltip
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { 
        uniqueId, items, columnsDesktop, columnsTablet, columnsMobile, gridGap,
        borderRadius, hasShadow, shadowColor, showTags, showTagLine, cardBgColor,
        tagBgColor, tagTextColor, hasZoom, zoomScale,
        titleColor, titleFontSize, descColor, descFontSize, tagFontSize
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

    const removeItem = ( index ) => {
        const newItems = items.filter( ( _, i ) => i !== index );
        setAttributes( { items: newItems } );
    };

    const addNewItem = () => {
        setAttributes( { items: [ ...items, { title: '', description: '', url: '', tags: '' } ] } );
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
            </InspectorControls>

            <InspectorControls group="styles">
                <PanelBody title={ __( 'Card Appearance', 'masionary' ) }>
                    <BaseControl label={ __( 'Background Color', 'masionary' ) }>
                        <ColorPalette value={ cardBgColor } onChange={ ( val ) => setAttributes( { cardBgColor: val } ) } />
                    </BaseControl>
                    <RangeControl label={ __( 'Border Radius', 'masionary' ) } value={ borderRadius } onChange={ ( val ) => setAttributes( { borderRadius: val } ) } min={ 0 } max={ 100 } />
                    <ToggleControl label={ __( 'Drop Shadow', 'masionary' ) } checked={ hasShadow } onChange={ ( val ) => setAttributes( { hasShadow: val } ) } />
                    <hr />
                    <ToggleControl label={ __( 'Enable Image Zoom', 'masionary' ) } checked={ hasZoom } onChange={ ( val ) => setAttributes( { hasZoom: val } ) } />
                    { hasZoom && <RangeControl label={ __( 'Zoom Intensity', 'masionary' ) } value={ zoomScale } onChange={ ( val ) => setAttributes( { zoomScale: val } ) } min={ 1 } max={ 1.5 } step={ 0.01 } /> }
                </PanelBody>

                <PanelBody title={ __( 'Typography', 'masionary' ) }>
                    <RangeControl label={ __( 'Title Font Size (px)', 'masionary' ) } value={ titleFontSize } onChange={ ( val ) => setAttributes( { titleFontSize: val } ) } min={ 12 } max={ 80 } />
                    <RangeControl label={ __( 'Desc Font Size (px)', 'masionary' ) } value={ descFontSize } onChange={ ( val ) => setAttributes( { descFontSize: val } ) } min={ 10 } max={ 40 } />
                    <RangeControl label={ __( 'Tag Font Size (px)', 'masionary' ) } value={ tagFontSize } onChange={ ( val ) => setAttributes( { tagFontSize: val } ) } min={ 8 } max={ 20 } />
                </PanelBody>

                <PanelColorSettings
                    title={ __( 'Text Colors', 'masionary' ) }
                    initialOpen={ false }
                    colorSettings={ [
                        { value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Title Color', 'masionary' ) },
                        { value: descColor, onChange: ( val ) => setAttributes( { descColor: val } ), label: __( 'Description Color', 'masionary' ) },
                    ] }
                />

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

            <div className="portfolio-editor-wrapper">
                <div className="portfolio-grid-editor" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    { items.map( ( item, index ) => (
                        <div key={ index } className="item-card-wrapper" style={ { 
                            background: '#fff', 
                            border: '1px solid #ddd', 
                            padding: '15px', 
                            borderRadius: '8px',
                            width: '300px',
                            textAlign: 'left' // Keep text left-aligned inside centered cards
                        } }>
                            <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' } }>
                                <span style={ { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#999' } }>
                                    { __( 'Item', 'masionary' ) } #{ index + 1 }
                                </span>
                                <Tooltip text={ __( 'Remove Item', 'masionary' ) }>
                                    <Button isDestructive icon="trash" onClick={ () => removeItem( index ) } />
                                </Tooltip>
                            </div>

                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <div onClick={ open } style={ { background: '#f0f0f0', border: '2px dashed #ccc', padding: '10px', textAlign: 'center', cursor: 'pointer', marginBottom: '15px', borderRadius: '4px' } }>
                                            { item.url ? <img src={ item.url } style={ { maxHeight: '80px', borderRadius: '4px' } } alt="" /> : <Dashicon icon="format-image" /> }
                                            <div style={ { fontSize: '10px', marginTop: '5px' } }>{ item.url ? __( 'Change Image', 'masionary' ) : __( 'Add Image', 'masionary' ) }</div>
                                        </div>
                                    ) }
                                />
                            </MediaUploadCheck>

                            <TextControl label={ __( 'Title', 'masionary' ) } value={ item.title } onChange={ ( val ) => updateItem( index, 'title', val ) } />
                            <TextareaControl label={ __( 'Description', 'masionary' ) } value={ item.description } onChange={ ( val ) => updateItem( index, 'description', val ) } />
                            <TextControl label={ __( 'Tags', 'masionary' ) } value={ item.tags } onChange={ ( val ) => updateItem( index, 'tags', val ) } />
                        </div>
                    ) ) }
                </div>
                
                <div style={ { marginTop: '30px', textAlign: 'center' } }>
                    <Button isPrimary icon="plus" onClick={ addNewItem }>
                        { __( 'Add Portfolio Item', 'masionary' ) }
                    </Button>
                </div>
            </div>
        </div>
    );
}