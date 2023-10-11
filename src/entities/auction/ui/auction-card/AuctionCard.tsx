import { useState } from 'react';
import { Link } from 'react-router-dom';
import cls from './AuctionCard.module.scss';
import img from '@assets/temporary-auctions-img/watch.png';

interface IAuctionCardProps {
  id: string;
  alt: string;
  title: string;
  date: string;
  bids: string;
  places: string;
  changeStatus: boolean;
  startedAt: Date;
  className?: string;
}

const AuctionCard = ({ id, alt, title, date, bids, places, changeStatus, startedAt }: IAuctionCardProps) => {
  const [clazz, setClass] = useState(cls.card);
  const [place, setPlace] = useState(places);
  const [timer, setTimer] = useState(false);
  const [join, setJoin] = useState(false);

  const onJoin = () => {
    setJoin(!join);
    setClass(clazz === cls.card ? `${cls.card} ${cls.active}` : cls.card);
    setTimer(!timer);
    setPlace(place + 1);
    // changeStatus(id, 'wait');
  };

  const formattedDate = new Date(startedAt).toLocaleString();

  const StartDate = () => {
    if (!timer) {
      return (
          <div className={cls.card__start}>
            <span>Start in:</span>
            <span>{formattedDate}</span>
          </div>
      );
    } else {
      return null;
    }
  };

  return (
      <div className={clazz}>
        <div className={cls.card__imgbox}>
          <div className={cls.deposit}>
            <div className={cls.deposit__price}>
              <div className={cls.price__title}>200 ROTO</div>
              <span>Deposit</span>
            </div>
          </div>
          <div className={cls.img__wrapper}>
            <img src={img} alt={alt} />
          </div>
          <div className={cls.click__price}>
            <div className={cls.price__title}>20 ROTO</div>
            <span>Click price</span>
          </div>
        </div>
        <div className={cls.cardContent}>
          <div className={cls.cardHeader}>
            <span className={cls.card__name}>{title}</span>
            <span className={cls.card__price}>{'$' + 1}</span>
          </div>
          <div className={cls.card__places}>
            <span>Vacant places:</span>
            <span>{place} from 30</span>
          </div>
          <StartDate />
          <Link to={`/Lot/${id}`}>
            <button className={cls.card__btn} onClick={onJoin}>
              <span>Read More</span>
            </button>
          </Link>
        </div>
      </div>
  );
};

export default AuctionCard;
