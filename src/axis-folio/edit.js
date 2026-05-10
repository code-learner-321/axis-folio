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
    ToggleControl 
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { 
        uniqueId, items = [], columnsDesktop, columnsTablet, columnsMobile, gridGap,
        borderRadius, hasShadow, cardBgColor,
        tagBgColor, tagTextColor,
        titleColor, descColor,
        enableLoadMore, postsPerPage, loadMoreText, btnBgColor, btnTextColor
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
        setAttributes( { 
            items: [ ...items, { title: '', description: '', url: '', tags: '' } ] 
        } );
    };

    return (
        <div { ...useBlockProps() }>
            <InspectorControls>
                <PanelBody title={ __( 'Grid Layout', 'axis-folio' ) }>
                    <RangeControl label={ __( 'Grid Gap', 'axis-folio' ) } value={ gridGap } onChange={ ( val ) => setAttributes( { gridGap: val } ) } min={ 0 } max={ 50 } />
                    <RangeControl label={ __( 'Columns (Desktop)', 'axis-folio' ) } value={ columnsDesktop } onChange={ ( val ) => setAttributes( { columnsDesktop: val } ) } min={ 1 } max={ 6 } />
                </PanelBody>

                <PanelBody title={ __( 'Load More Settings', 'axis-folio' ) }>
                    <ToggleControl 
                        label={ __( 'Enable Load More', 'axis-folio' ) } 
                        checked={ enableLoadMore } 
                        onChange={ ( val ) => setAttributes( { enableLoadMore: val } ) } 
                    />
                    { enableLoadMore && (
                        <>
                            <RangeControl 
                                label={ __( 'Items Per Page', 'axis-folio' ) } 
                                value={ postsPerPage } 
                                onChange={ ( val ) => setAttributes( { postsPerPage: val } ) } 
                                min={ 1 } max={ 12 } 
                            />
                            <TextControl 
                                label={ __( 'Button Text', 'axis-folio' ) } 
                                value={ loadMoreText } 
                                onChange={ ( val ) => setAttributes( { loadMoreText: val } ) } 
                            />
                        </>
                    )}
                </PanelBody>

                <PanelColorSettings
                    title={ __( 'Colors & Styles', 'axis-folio' ) }
                    initialOpen={ false }
                    colorSettings={ [
                        { value: cardBgColor, onChange: ( val ) => setAttributes( { cardBgColor: val } ), label: __( 'Card Background', 'axis-folio' ) },
                        { value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Title Color', 'axis-folio' ) },
                        { value: descColor, onChange: ( val ) => setAttributes( { descColor: val } ), label: __( 'Description Color', 'axis-folio' ) },
                        { value: btnBgColor, onChange: ( val ) => setAttributes( { btnBgColor: val } ), label: __( 'Button Background', 'axis-folio' ) },
                        { value: btnTextColor, onChange: ( val ) => setAttributes( { btnTextColor: val } ), label: __( 'Button Text', 'axis-folio' ) },
                    ] }
                />
            </InspectorControls>

            <div className="portfolio-editor-wrapper" style={{ padding: '20px', background: '#f9f9f9', border: '1px solid #ddd' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    { items.map( ( item, index ) => (
                        <div key={ index } style={ { background: '#fff', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' } }>
                            <div style={ { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' } }>
                                <strong>Project { index + 1 }</strong>
                                <Button isDestructive icon="trash" onClick={ () => removeItem( index ) } />
                            </div>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ ( media ) => updateItem( index, 'url', media.url ) }
                                    allowedTypes={ [ 'image' ] }
                                    render={ ( { open } ) => (
                                        <div onClick={ open } style={ { background: '#eee', padding: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '10px' } }>
                                            { item.url ? <img src={ item.url } style={ { maxHeight: '60px' } } /> : <Dashicon icon="format-image" /> }
                                        </div>
                                    ) }
                                />
                            </MediaUploadCheck>
                            <TextControl label="Title" value={ item.title } onChange={ ( val ) => updateItem( index, 'title', val ) } />
                            <TextareaControl label="Description" value={ item.description } onChange={ ( val ) => updateItem( index, 'description', val ) } />
                            <TextControl label="Tags" value={ item.tags } onChange={ ( val ) => updateItem( index, 'tags', val ) } />
                        </div>
                    ) ) }
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button isPrimary onClick={ addNewItem }>{ __( 'Add New Item', 'axis-folio' ) }</Button>
                </div>
            </div>
        </div>
    );
}