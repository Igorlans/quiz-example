interface ProfileInfoFieldProps {
    fieldName: string;
    value: string;
  }

export const ProfileInfoField: React.FC<ProfileInfoFieldProps> = ({fieldName, value}) => {
    return (
      <div className="profile__field">
        <div className='profile__field-key'>{fieldName}</div>
        <div className='profile__field-value'>{value}</div>
      </div>
    )
}