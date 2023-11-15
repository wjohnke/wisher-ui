import {useEffect, useState} from "react";
import './group.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {Group} from "../../types/Group";
import {useNavigate} from "react-router-dom";
import {isNil} from "lodash";

const Groups = (props: Iprops) => {
  const {user, captureGroup } = props;
  const navigate = useNavigate();

  console.log("USER IS", user)

  const groups: Group[] = [{
    name: 'carr fam xmas',
    members: [
      'will',
      'danielle',
    ]
  }, {
    name: 'johnke fam xmas',
    members: [
      'will',
      'danielle',
    ]
  }]

  const handleSelect = (group: Group) => {
     captureGroup(group);
     navigate('/WishList');
  }

  useEffect(() => {
    if (isNil(user) || user === '') {
      navigate('/Welcome');
    }
  }, [])

  return (
    <div className={'group-page'}>
      <div className={'group-title'}>choose your list</div>
      <div className={'group-wrapper'}>
        {groups.map(group => {
          return (
            <div key={group.name} className={'group'} onClick={() => {
              handleSelect(group);
            }}>
              <div className={'group-name'}>{group.name}</div>
              <div className={'members'}>
                {group.members.map(member => {
                  return <div key={member} className={'member'}>{member}</div>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface Iprops {
  user: string;
  captureGroup: (arg: Group) => void;
}

export default Groups;
