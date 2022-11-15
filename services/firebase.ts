import { getDatabase, set, ref as refDatabase, get, child, push, update as fbUpdate, remove as fbRemove, query } from "firebase/database";
import { sortByPos } from "~/helpers";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'

class Firebase {
  database = getDatabase();
  storage = getStorage();

  coffee = {
    getAll: () => this.get('coffee')
  }

  sherbets = {
    getAll: () => this.get('desserts_sherbet')
  }

  iceCream = {
    getAll: () => this.get('desserts_ice_cream')
  }

  lemonades = {
    getAll: () => this.get('drinks_lemonade')
  }

  milkshakes = {
    getAll: () => this.get('drinks_milkshakes')
  }

  coldTeas = {
    getAll: () => this.get('drinks_cold_tea')
  }

  juices = {
    getAll: () => this.get('drinks_juices')
  }

  energeticDrinks = {
    getAll: () => this.get('drinks_energetic_drinks')
  }

  beer = {
    getAll: () => this.get('drinks_nonalcoholic_beer')
  }

  pricesHookahs = {
    getAll: () => this.get('hookah_prices')
  }

  fruitHookahs = {
    getAll: () => this.get('hookah_fruit')
  }

  corkageFees = {
    getAll: () => this.get('hookah_corkage_fee')
  }

  additionallyHookahs = {
    getAll: () => this.get('hookah_additionally')
  }

  sandwiches = {
    getAll: () => this.get('snacks_sandwiches')
  }

  snacks = {
    getAll: () => this.get('snacks')
  }

  classicTeas = {
    getAll: () => this.get('tea_classical')
  }

  notTeas = {
    getAll: () => this.get('tea_not_tea')
  }

  chineseTeas = {
    getAll: () => this.get('tea_chinese')
  }

  additives = {
    getAll: () => this.get('tea_additives')
  }






  promoCodes = {
    add: (promoCode) => this.add('promo_codes', promoCode),
    getAll: () => this.getArray('promo_codes'),
    update: (promoCode) => this.update('promo_codes', promoCode),
    remove: (id) => this.remove('promo_codes', id)
  }

  stocks = {
    add: async (stock) => {
      const imageObj = await this.images.add('stocks', stock.imageUrl);
      return await this.add('stocks', { ...stock, ...imageObj });
    },
    getAll: () => this.getArray('stocks'),
    update: async (stock) => {
      const newStock = {...stock};

      if (newStock.imageUrl.uid) {
        if (newStock.imageId) {
          await this.images.remove('stocks', newStock.imageId);
        }

        const { imageUrl, imageId } = await this.images.add('stocks', newStock.imageUrl)

        newStock.imageId = imageId;
        newStock.imageUrl = imageUrl;
      }

      return await this.update('stocks', newStock)
    },
    remove: async (id, imageId) => {
      if (imageId) {
        await this.images.remove('stocks', imageId);
      }
      return await this.remove('stocks', id);
    }
  }

  rules = {
    add: (rule) => this.add('rules', rule),
    getAll: () => this.getArray('rules'),
    update: (rule) => this.update('rules', rule),
    remove: (id) => this.remove('rules', id)
  }

  discountRules = {
    add: (discountRule) => this.add('discount_rules', discountRule),
    getAll: () => this.getArray('discount_rules'),
    update: (discountRule) => this.update('discount_rules', discountRule),
    remove: (id) => this.remove('discount_rules', id)
  }

  places = {
    add: (place) => this.add('places', place),
    getAll: () => this.getArray('places'),
    update: (place) => this.update('places', place),
    remove: (id) => this.remove('places', id)
  }

  users = {
    add: (user) => this.add('users', user),
    getAll: () => this.getArray('users'),
    update: (user) => this.update('users', user),
    remove: (id) => this.remove('users', id)
  }

  images = {
    add: async (url, file) => {
      if (!file) {
        return { imageUrl: '', imageId: '' };
      }

      const refImage = this.getRefStorage(`${url}/${file.uid}`);

      return await uploadBytes(refImage, file)
        .then(async () => {
          const imageUrl = await getDownloadURL(refImage).then(url => url).catch(() => "");

          return { imageUrl:  imageUrl, imageId: file.uid }
        })
        .catch(() => ({ imageUrl: '', imageId: '' }));
    },
    remove: async (url, id) => {
      return deleteObject(this.getRefStorage(`${url}/${id}`))
        .then(() => true)
        .catch(() => false);
    }
  }

  //-------------------------------------------------------------

  async get<T>(url: string): Promise<T> {
    return get(child(refDatabase(this.database), url))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null;
        }
      })
      .catch(() => {
          return null;
        }
      );
  }

  async getArray<T>(url: string): Promise<T[]> {
    const result = await this.get(url) as T;

    return result? sortByPos(Object.keys(result)
      .map(key => ({ ...result[key], id: key })))
      : [];
  }

  async add<T extends { id? }>(url: string, obj: T): Promise<T | null> {
    const databaseRef = push(this.getRefDatabase(url));

    const newObj = {
      ...JSON.parse(JSON.stringify(obj)),
      pos: Date.now()
    };

    if ('id' in newObj)
      delete newObj.id;

    return set(databaseRef, newObj)
      .then(() => {
        return {
          ...newObj,
          id: databaseRef.key
        };
      })
      .catch(() => {
          return null;
        }
      );
  }

  async remove(url: string, id: string) {
    await fbRemove(this.getRefDatabase(`${url}/${id}`))
  }

  async update<T extends { id?: string }>(url: string, obj: T) {
    if ('id' in obj) {
      const id = obj.id;
      delete obj.id;

      await fbUpdate(this.getRefDatabase(`${url}/${id}`), obj);
    }
  }

  getRefDatabase(url) {
    return refDatabase(this.database, url);
  }

  getRefStorage(url) {
    return refStorage(this.storage, url);
  }
}

export { Firebase };
