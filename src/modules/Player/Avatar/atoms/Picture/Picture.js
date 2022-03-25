import './Picture.scss';

export default function Picture({src, size}) {
    return (
        <div className={'picture'} style={{width: size + 'px', height: size + 'px', backgroundImage:`url(${src})`}}></div>
    )
}