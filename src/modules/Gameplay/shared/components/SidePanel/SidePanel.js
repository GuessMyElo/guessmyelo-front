import './SidePanel.scss';

export default function SidePanel({children}) {
    return (
        <div className={'sidepanel-container'}>
            {children}
        </div>
    )
}