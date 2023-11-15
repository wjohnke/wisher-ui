import {useEffect, useState} from "react";
import './wishlist.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import {Button, Popover, styled, TextField, Tooltip} from "@mui/material";
import {UserData} from "../../types/UserData";
import {ItemType} from "../../types/ItemType";
import {isEmpty, isNil} from 'lodash';
import {Group} from "../../types/Group";
import WishPopover from "./WishPopover";
import {useNavigate} from "react-router-dom";

const WishList = (props: Iprops) => {

  // todo const { user } = props;
  const {user, group} = props;
  // todo TYPES

  console.log(props)
  console.log(user)

  //todo - prepopulate from service
  const [itemList, setItemList] = useState<ItemType[]>([
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    },
  ]);

  const [itemToAddName, setItemToAddName] = useState('');
  const [itemToAddLink, setItemToAddLink] = useState('');
  const [itemToAddNotes, setItemToAddNotes] = useState('');
  const [remaining, setRemaining] = useState<UserData[]>([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    //todo - save to backend
    setItemList([
        ...itemList,
        {
          item: itemToAddName,
          link: itemToAddLink,
          notes: itemToAddNotes,
          purchased: null,
          reserved: null,
        }
      ]
    )
    setItemToAddName('');
    setItemToAddLink('');
    setItemToAddNotes('');
  }

  const removeItem = (item: ItemType) => {
    setItemList(
      itemList.filter(itemInList => {
        return itemInList.item !== item.item
      })
    )
  }

  const handleReserve = (itemType: ItemType, userData: UserData) => {
    // todo - network call
    const newRemaining = remaining.map(remain => {
      if (remain.name === userData.name) {
        remain.list = remain.list.map(item => {
          if (item.item === itemType.item) {
            item.reserved = user;
          }
          return item;
        })
      }
      return remain;
    })
    setRemaining(newRemaining);
  }

  const handlePurchase = (itemType: ItemType, userData: UserData) => {
    // todo - network call
    const newRemaining = remaining.map(remain => {
      if (remain.name === userData.name) {
        remain.list = remain.list.map(item => {
          if (item.item === itemType.item) {
            item.purchased = user;
          }
          return item;
        })
      }
      return remain;
    })
    setRemaining(newRemaining);
  }

  useEffect(() => {
    if (isNil(user) || user === '' || isNil(group)) {
      navigate('/Welcome');
    }
  }, [])

  useEffect(() => {
    const predicate: (member: UserData, userData: string) => boolean = ((member, userData) => {
      return member.name === userData;
    });
    const currentMember = members.filter(member => predicate(member, user));
    const remaining = members.filter(member => !predicate(member, user));
    setItemList(currentMember[0] ? currentMember[0].list : []);
    setRemaining(remaining);
  }, [])

  return (
    <div className={'wish-page'}>
      <div className={'page-title'}>
        {group?.name}
      </div>
      <div className={'wish-wrapper'}>
        <div className={'member-view'}>
          <div className={'member-name'}>{user}</div>
          <div className={'item-list'}>
            {itemList.map(item => {
              return (
                <div key={item.item} className={'item-self'}>
                  <div className={'item-self-icons'} onClick={() => removeItem(item)}>
                    <FontAwesomeIcon icon={solid("trash")} size={'lg'}/>
                  </div>
                  <WishPopover item={item}/>
                  <div className={'item-self-name'}>
                    {item.item}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={'item-input-title'}>
            add your items below:
          </div>
          <div className={'item-input'}>
            <div className={'item-input-section1'}>
              <TextField fullWidth id="outlined-basic" label="Item name" variant="outlined"
                         value={itemToAddName}
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setItemToAddName(event.target.value);
                         }}
              />
              <TextField fullWidth id="outlined-basic" label="Link" variant="outlined"
                         value={itemToAddLink}
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setItemToAddLink(event.target.value);
                         }}
              />
            </div>
            <div className={'item-input-section2'}>
              <TextField multiline minRows={4} maxRows={4} fullWidth id="outlined-basic" label="Notes"
                         variant="outlined"
                         value={itemToAddNotes}
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setItemToAddNotes(event.target.value);
                         }}
              />
              <div className={'item-input-save-holder'}>
                <div className={'item-input-save-wrapper'} onClick={() => {
                  handleAdd();
                }}>
                  <div className={'item-input-save'}>
                    <FontAwesomeIcon icon={solid("plus")} style={{color: "#ffffff"}} size={'lg'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {remaining.map(member => {
          return (
            <div key={member.name} className={'member-view'}>
              <div className={'member-name'}>{member.name}</div>
              <div className={'item-list'}>
                {member.list.map(item => {
                  return <div key={item.item} className={'item'}>
                    <div className={`item-description ${item.purchased ? 'purchased' : ''}`}>
                      <div className={'item-name'}>{item.item}</div>
                      <div className={'item-link'}>
                        <a className={'item-link-a'} href={item.link} target={"_blank"}>
                          <div className={'item-link-address'}>
                            Click to view
                          </div>
                          <FontAwesomeIcon icon={solid("up-right-from-square")} size={'2xs'}/>
                        </a>
                      </div>
                    </div>
                    <div className={'item-input'}>
                      <div className={'item-input-reserve'} onClick={() => handleReserve(item, member)}>
                        <Tooltip title={item.reserved ? `Reserved by ${item.reserved}` : 'Reserve'}>
                          <FontAwesomeIcon style={{color: `${isEmpty(item.reserved) ? 'black' : '#3a3de0'}`}}
                                           icon={solid("hand")} size={'lg'}/>
                        </Tooltip>
                      </div>
                      <div className={'item-input-purchase'} onClick={() => handlePurchase(item, member)}>
                        <Tooltip title={item.purchased ? `Purchased by ${item.purchased}` : 'Purchase'}>
                          <FontAwesomeIcon style={{color: `${isEmpty(item.purchased) ? 'black' : 'green'}`}}
                                           icon={solid("cart-shopping")} size={'lg'}/>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CustomButton = styled(Button)`
  font-family: 'Lexend Deca';
  text-transform: lowercase;
`;

interface Iprops {
  user: string;
  group: Group | undefined;
}

export default WishList;


//TODO ------ TODO
const members: UserData[] = [{
  name: "will",
  list: [
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    },
    {
      item: "Hand saw",
      link: "https://www.homedepot.com/p/DEWALT-20V-MAX-Cordless-Reciprocating-Saw-Tool-Only-DCS380B/203164237#overlay",
      notes: '',
      purchased: null,
      reserved: null,
    },
  ]
}, {
  name: "danielle",
  list: [
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    }
  ]
}, {
  name: "lauren",
  list: [
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    }
  ]
}, {
  name: "anna",
  list: [
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    }
  ]
}, {
  name: "greg",
  list: [
    {
      item: "Top golf",
      link: "https://topgolf.com/us/plan-a-visit/",
      notes: '',
      purchased: null,
      reserved: null,
    }
  ]
}];
