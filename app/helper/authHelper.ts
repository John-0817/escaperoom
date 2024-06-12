import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase/firebaseConfig';

export async function createUser(userName: string, email: string, password: string) {

  function generateUniqueId(username: string) {
    const randomKey = Math.floor(100000 + Math.random() * 900000).toString();
    return `${username}#${randomKey}`;
  };
  
  await createUserWithEmailAndPassword(auth, email, password);
  const uniqueId = generateUniqueId(userName);

  await setDoc(doc(db, 'Users', uniqueId), {
    username: uniqueId,
    email: email,
    library: [],
    private: {},
    public: {},
    joinDate: Timestamp.now()
  });
}