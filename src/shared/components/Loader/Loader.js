import './Loader.scss';

export default function Loader({parent}) {
    return (
        <div className={'loader '+ (parent ? parent : '')}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}