import Picture from '@/modules/Player/Avatar/atoms/Picture/Picture';
import './ScoreboardItem.scss';

export default function ScoreboardItem({player, score, isEven, image}) {
    return (
        <div className={'scoreboard-item ' + (isEven ? 'even-item' : '')}>
            <Picture src={image} size="40" />
            <p>{player} - {score} pts</p>
        </div>
    )
}