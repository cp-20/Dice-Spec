import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { nanoid } from 'nanoid';

const firebaseConfig = {
  apiKey: 'AIzaSyBdxRe2b4wCNUoPQtbIjJxv8q00Rn8ctvU',
  authDomain: 'dicespec-fd392.firebaseapp.com',
  projectId: 'dicespec-fd392',
  storageBucket: 'dicespec-fd392.appspot.com',
  messagingSenderId: '9403733200',
  appId: '1:9403733200:web:2cdda33921973660a1bad5',
};

type firebaseObject = {
  uploadImage: (url: string) => Promise<string>;
};

export const useFirebase = (): firebaseObject => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const uploadImage = async (url: string) => {
    const imagePath = `${nanoid(32)}.png`;

    const storageRef = ref(storage, imagePath);
    const snapshot = await uploadString(storageRef, url, 'data_url');
    const imageUrl = await getDownloadURL(snapshot.ref);

    return imageUrl;
  };

  return { uploadImage };
};
