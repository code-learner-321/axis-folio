import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
    // 1. Define your data in an array to avoid repeating HTML code
    const portfolioItems = [
        { id: 1, title: 'Data Visualization', tags: ['D3.js', 'React'], height: 500 },
        { id: 2, title: 'Secure Gateway', tags: ['Go', 'Docker'], height: 300 },
        { id: 3, title: 'Mobile Banking', tags: ['Flutter', 'Firebase'], height: 600 },
        { id: 4, title: 'AI Content Writer', tags: ['Python', 'GPT-4'], height: 400 },
        { id: 5, title: 'Smart Home Hub', tags: ['IoT', 'Node.js'], height: 700 },
        { id: 6, title: 'Crypto Portfolio', tags: ['Vue', 'Web3'], height: 350 },
        { id: 7, title: 'E-Learning Portal', tags: ['Next.js', 'PostgreSQL'], height: 550 },
        { id: 8, title: 'Fitness Tracker', tags: ['Swift', 'HealthKit'], height: 450 },
        { id: 9, title: 'Event Manager', tags: ['Laravel', 'MySQL'], height: 650 },
        { id: 10, title: 'Photo Lab', tags: ['Canvas API', 'JS'], height: 380 },
    ];

    return (
        <div { ...useBlockProps() }>
            <div className="masonry-container">
                { portfolioItems.map( ( item ) => (
                    <div key={ item.id } className="card">
                        <img 
                            src={ `https://picsum.photos/400/${ item.height }?sig=${ item.id }` } 
                            alt={ item.title } 
                        />
                        <div className="card-body">
                            <h3 className="card-title">{ item.title }</h3>
                            <div className="tags-container">
                                { item.tags.map( ( tag, index ) => (
                                    <span key={ index } className="tag">{ tag }</span>
                                ) ) }
                            </div>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}