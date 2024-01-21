import QRCode from 'react-qr-code';
import classes from './QR.module.scss'

interface QRProps {
  value: string;
  size?: number;
}

const QR: React.FC<QRProps> = ({value, size}) => {
  return (
    <div className={classes.qr}>
      <QRCode value={value} size={size} />
    </div>
  )
}

export default QR;