import { getDatabase, set, ref as refDatabase, get, child, push, update as fbUpdate, remove as fbRemove, query } from "firebase/database";
import { sortArrayByPos } from "~/helpers";
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











  categories = {
    beverages: {
      beer: {
        add: (beveragesBeer) => this.add('beverages_beer', beveragesBeer),
        getAll: () => this.getArray('beverages_beer'),
        update: (beveragesBeer) => this.update('beverages_beer', beveragesBeer),
        remove: (id) => this.remove('beverages_beer', id)
      },

      coldTeas: {
        add: (coldTea) => this.add('beverages_cold_teas', coldTea),
        getAll: () => this.getArray('beverages_cold_teas'),
        update: (coldTea) => this.update('beverages_cold_teas', coldTea),
        remove: (id) => this.remove('beverages_cold_teas', id)
      },

      energeticDrinks: {
        add: (energeticDrink) => this.add('beverages_energetic_drinks', energeticDrink),
        getAll: () => this.getArray('beverages_energetic_drinks'),
        update: (energeticDrink) => this.update('beverages_energetic_drinks', energeticDrink),
        remove: (id) => this.remove('beverages_energetic_drinks', id)
      },

      juices: {
        add: (juice) => this.add('beverages_juices', juice),
        getAll: () => this.getArray('beverages_juices'),
        update: (juice) => this.update('beverages_juices', juice),
        remove: (id) => this.remove('beverages_juices', id)
      },

      lemonade: {
        add: (lemonade) => this.add('beverages_lemonade', lemonade),
        getAll: () => this.getArray('beverages_lemonade'),
        update: (lemonade) => this.update('beverages_lemonade', lemonade),
        remove: (id) => this.remove('beverages_lemonade', id)
      },

      milkshakes: {
        add: (milkshake) => this.add('beverages_milkshakes', milkshake),
        getAll: () => this.getArray('beverages_milkshakes'),
        update: (milkshake) => this.update('beverages_milkshakes', milkshake),
        remove: (id) => this.remove('beverages_milkshakes', id)
      }
    },
    coffee: {
      add: (coffee) => this.add('coffee', coffee),
      getAll: () => this.getArray('coffee'),
      update: (coffee) => this.update('coffee', coffee),
      remove: (id) => this.remove('coffee', id)
    },
    desserts: {
      iceCream: {
        add: (iceCream) => this.add('desserts_ice_cream', iceCream),
        getAll: () => this.getArray('desserts_ice_cream'),
        update: (iceCream) => this.update('desserts_ice_cream', iceCream),
        remove: (id) => this.remove('desserts_ice_cream', id)
      },
      sherbets: {
        add: (sherbet) => this.add('desserts_sherbets', sherbet),
        getAll: () => this.getArray('desserts_sherbets'),
        update: (sherbet) => this.update('desserts_sherbets', sherbet),
        remove: (id) => this.remove('desserts_sherbets', id)
      }
    },
    hookah: {
      additional: {
        add: (additional) => this.add('hookah_additional', additional),
        getAll: () => this.getArray('hookah_additional'),
        update: (additional) => this.update('hookah_additional', additional),
        remove: (id) => this.remove('hookah_additional', id)
      },
      corkageFees: {
        add: (corkageFee) => this.add('hookah_corkage_fees', corkageFee),
        getAll: () => this.getArray('hookah_corkage_fees'),
        update: (corkageFee) => this.update('hookah_corkage_fees', corkageFee),
        remove: (id) => this.remove('hookah_corkage_fees', id)
      },
      fruity: {
        add: (fruity) => this.add('hookah_fruity', fruity),
        getAll: () => this.getArray('hookah_fruity'),
        update: (fruity) => this.update('hookah_fruity', fruity),
        remove: (id) => this.remove('hookah_fruity', id)
      }
    },
    snacks: {
      add: (snack) => this.add('snacks', snack),
      getAll: () => this.getArray('snacks'),
      update: (snack) => this.update('snacks', snack),
      remove: (id) => this.remove('snacks', id),

      sandwiches: {
        add: (sandwich) => this.add('snacks_sandwiches', sandwich),
        getAll: () => this.getArray('snacks_sandwiches'),
        update: (sandwich) => this.update('snacks_sandwiches', sandwich),
        remove: (id) => this.remove('snacks_sandwiches', id)
      }
    },
    tea: {
      additives: {
        add: (additive) => this.add('tea_additives', additive),
        getAll: () => this.getArray('tea_additives'),
        update: (additive) => this.update('tea_additives', additive),
        remove: (id) => this.remove('tea_additives', id)
      },
      notTeas: {
        add: (tea) => this.add('tea_not_teas', tea),
        getAll: () => this.getArray('tea_not_teas'),
        update: (tea) => this.update('tea_not_teas', tea),
        remove: (id) => this.remove('tea_not_teas', id)
      },
      сhinese: {
        add: (сhinese) => this.add('tea_сhinese', сhinese),
        getAll: () => this.getArray('tea_сhinese'),
        update: (сhinese) => this.update('tea_сhinese', сhinese),
        remove: (id) => this.remove('tea_сhinese', id)
      },
      сlassic: {
        add: (сlassic) => this.add('tea_сlassic', сlassic),
        getAll: () => this.getArray('tea_сlassic'),
        update: (сlassic) => this.update('tea_сlassic', сlassic),
        remove: (id) => this.remove('tea_сlassic', id)
      }
    }
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

    return result? sortArrayByPos(Object.keys(result)
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
