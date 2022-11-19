import { getDatabase, set, ref as refDatabase, get, child, push, update as fbUpdate, remove as fbRemove } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import { sortArrayByPos } from "~/helpers";
import { Database } from "@/types"

type IImageFile = (Blob | Uint8Array | ArrayBuffer) & { uid: string };

class Firebase {
  database = getDatabase();
  storage = getStorage();

  history = {
    navigations: {
      add: (history: Database.History.INavigation) => this.add<Database.History.INavigation>('history_navigations', history),
      getAll: () => this.getArray<Database.History.INavigation>('history_navigations')
    },
    payment: {
      add: (history: Database.History.IPayment) => this.add<Database.History.IPayment>('history_payment', history),
      getAll: () => this.getArray<Database.History.IPayment>('history_payment')
    },
    users: {
      add: (history: Database.History.IUser) => this.add<Database.History.IUser>('history_users', history),
      getAll: () => this.getArray<Database.History.IUser>('history_users')
    }
  }

  categories = {
    beverages: {
      beer: {
        add: (beveragesBeer: Database.ICategory) => this.add<Database.ICategory>('beverages_beer', beveragesBeer),
        getAll: () => this.getArray<Database.ICategory>('beverages_beer'),
        update: (beveragesBeer: Database.ICategory) => this.update('beverages_beer', beveragesBeer),
        remove: (id: string) => this.remove('beverages_beer', id)
      },

      coldTeas: {
        add: (coldTea: Database.ICategory) => this.add<Database.ICategory>('beverages_cold_teas', coldTea),
        getAll: () => this.getArray<Database.ICategory>('beverages_cold_teas'),
        update: (coldTea: Database.ICategory) => this.update('beverages_cold_teas', coldTea),
        remove: (id: string) => this.remove('beverages_cold_teas', id)
      },

      energeticDrinks: {
        add: (energeticDrink: Database.ICategory) => this.add<Database.ICategory>('beverages_energetic_drinks', energeticDrink),
        getAll: () => this.getArray<Database.ICategory>('beverages_energetic_drinks'),
        update: (energeticDrink: Database.ICategory) => this.update('beverages_energetic_drinks', energeticDrink),
        remove: (id: string) => this.remove('beverages_energetic_drinks', id)
      },

      juices: {
        add: (juice: Database.ICategory) => this.add<Database.ICategory>('beverages_juices', juice),
        getAll: () => this.getArray<Database.ICategory>('beverages_juices'),
        update: (juice: Database.ICategory) => this.update('beverages_juices', juice),
        remove: (id: string) => this.remove('beverages_juices', id)
      },

      lemonade: {
        add: (lemonade: Database.ICategory) => this.add<Database.ICategory>('beverages_lemonade', lemonade),
        getAll: () => this.getArray<Database.ICategory>('beverages_lemonade'),
        update: (lemonade: Database.ICategory) => this.update('beverages_lemonade', lemonade),
        remove: (id: string) => this.remove('beverages_lemonade', id)
      },

      milkshakes: {
        add: (milkshake: Database.ICategory) => this.add<Database.ICategory>('beverages_milkshakes', milkshake),
        getAll: () => this.getArray<Database.ICategory>('beverages_milkshakes'),
        update: (milkshake: Database.ICategory) => this.update('beverages_milkshakes', milkshake),
        remove: (id: string) => this.remove('beverages_milkshakes', id)
      }
    },
    coffee: {
      add: (coffee: Database.ICategory) => this.add<Database.ICategory>('coffee', coffee),
      getAll: () => this.getArray<Database.ICategory>('coffee'),
      update: (coffee: Database.ICategory) => this.update('coffee', coffee),
      remove: (id: string) => this.remove('coffee', id)
    },
    desserts: {
      iceCream: {
        add: (iceCream: Database.ICategory) => this.add<Database.ICategory>('desserts_ice_cream', iceCream),
        getAll: () => this.getArray<Database.ICategory>('desserts_ice_cream'),
        update: (iceCream: Database.ICategory) => this.update('desserts_ice_cream', iceCream),
        remove: (id: string) => this.remove('desserts_ice_cream', id)
      },
      sherbets: {
        add: (sherbet: Database.ICategory) => this.add<Database.ICategory>('desserts_sherbets', sherbet),
        getAll: () => this.getArray<Database.ICategory>('desserts_sherbets'),
        update: (sherbet: Database.ICategory) => this.update('desserts_sherbets', sherbet),
        remove: (id: string) => this.remove('desserts_sherbets', id)
      }
    },
    hookah: {
      additional: {
        add: (additional: Database.ICategory) => this.add<Database.ICategory>('hookah_additional', additional),
        getAll: () => this.getArray<Database.ICategory>('hookah_additional'),
        update: (additional: Database.ICategory) => this.update('hookah_additional', additional),
        remove: (id: string) => this.remove('hookah_additional', id)
      },
      corkageFees: {
        add: (corkageFee: Database.ICategory) => this.add<Database.ICategory>('hookah_corkage_fees', corkageFee),
        getAll: () => this.getArray<Database.ICategory>('hookah_corkage_fees'),
        update: (corkageFee: Database.ICategory) => this.update('hookah_corkage_fees', corkageFee),
        remove: (id: string) => this.remove('hookah_corkage_fees', id)
      },
      fruity: {
        add: (fruity: Database.ICategory) => this.add<Database.ICategory>('hookah_fruity', fruity),
        getAll: () => this.getArray<Database.ICategory>('hookah_fruity'),
        update: (fruity: Database.ICategory) => this.update('hookah_fruity', fruity),
        remove: (id: string) => this.remove('hookah_fruity', id)
      }
    },
    snacks: {
      add: (snack: Database.ICategory) => this.add<Database.ICategory>('snacks', snack),
      getAll: () => this.getArray<Database.ICategory>('snacks'),
      update: (snack: Database.ICategory) => this.update('snacks', snack),
      remove: (id: string) => this.remove('snacks', id),

      sandwiches: {
        add: (sandwich: Database.ICategory) => this.add('snacks_sandwiches', sandwich),
        getAll: () => this.getArray('snacks_sandwiches'),
        update: (sandwich: Database.ICategory) => this.update('snacks_sandwiches', sandwich),
        remove: (id: string) => this.remove('snacks_sandwiches', id)
      }
    },
    tea: {
      additives: {
        add: (additive: Database.ICategory) => this.add<Database.ICategory>('tea_additives', additive),
        getAll: () => this.getArray<Database.ICategory>('tea_additives'),
        update: (additive: Database.ICategory) => this.update('tea_additives', additive),
        remove: (id: string) => this.remove('tea_additives', id)
      },
      notTeas: {
        add: (tea: Database.ICategory) => this.add<Database.ICategory>('tea_not_teas', tea),
        getAll: () => this.getArray<Database.ICategory>('tea_not_teas'),
        update: (tea: Database.ICategory) => this.update('tea_not_teas', tea),
        remove: (id: string) => this.remove('tea_not_teas', id)
      },
      сhinese: {
        add: (сhinese: Database.ICategory) => this.add<Database.ICategory>('tea_сhinese', сhinese),
        getAll: () => this.getArray<Database.ICategory>('tea_сhinese'),
        update: (сhinese: Database.ICategory) => this.update('tea_сhinese', сhinese),
        remove: (id: string) => this.remove('tea_сhinese', id)
      },
      сlassic: {
        add: (сlassic: Database.ICategory) => this.add<Database.ICategory>('tea_сlassic', сlassic),
        getAll: () => this.getArray<Database.ICategory>('tea_сlassic'),
        update: (сlassic: Database.ICategory) => this.update('tea_сlassic', сlassic),
        remove: (id: string) => this.remove('tea_сlassic', id)
      }
    }
  }

  promoCodes = {
    add: (promoCode: Database.IPromoCode) => this.add<Database.IPromoCode>('promo_codes', promoCode),
    getAll: () => this.getArray<Database.IPromoCode>('promo_codes'),
    update: (promoCode: Database.IPromoCode) => this.update('promo_codes', promoCode),
    remove: (id: string) => this.remove('promo_codes', id)
  }

  stocks = {
    add: async (stock: Database.IStock) => {
      const imageObj = await this.images.add('stocks', stock.imageUrl as unknown as IImageFile);
      return await this.add<Database.IStock>('stocks', { ...stock, ...imageObj });
    },
    getAll: () => this.getArray('stocks'),
    update: async (stock: Database.IStock) => {
      const newStock = { ...stock };

      if ('uid' in (newStock.imageUrl as unknown as IImageFile)) {
        if (newStock.imageId) {
          await this.images.remove('stocks', newStock.imageId);
        }

        const { imageUrl, imageId } = await this.images.add('stocks', (newStock.imageUrl as unknown as IImageFile));

        newStock.imageId = imageId;
        newStock.imageUrl = imageUrl;
      }

      await this.update('stocks', newStock);
    },
    remove: async (id: string, imageId?: string) => {
      if (imageId) {
        await this.images.remove('stocks', imageId);
      }

      await this.remove('stocks', id);
    }
  }

  rules = {
    add: (rule: Database.IRule) => this.add<Database.IRule>('rules', rule),
    getAll: () => this.getArray<Database.IRule>('rules'),
    update: (rule: Database.IRule) => this.update('rules', rule),
    remove: (id: string) => this.remove('rules', id)
  }

  discountRules = {
    add: (discountRule: Database.IDiscountRule) => this.add<Database.IDiscountRule>('discount_rules', discountRule),
    getAll: () => this.getArray<Database.IDiscountRule>('discount_rules'),
    update: (discountRule: Database.IDiscountRule) => this.update('discount_rules', discountRule),
    remove: (id: string) => this.remove('discount_rules', id)
  }

  places = {
    add: (place: Database.IPlace) => this.add<Database.IPlace>('places', place),
    getAll: () => this.getArray<Database.IPlace>('places'),
    update: (place: Database.IPlace) => this.update('places', place),
    remove: (id: string) => this.remove('places', id)
  }

  users = {
    add: (user: Database.IUser) => this.add<Database.IUser>('users', user),
    getAll: () => this.getArray<Database.IUser>('users'),
    update: (user: Database.IUser) => this.update('users', user),
    remove: (id: string) => this.remove('users', id)
  }

  images = {
    add: async (url: string, file?: IImageFile) => {
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
    remove: async (url: string, id: string) => {
      return deleteObject(this.getRefStorage(`${url}/${id}`))
        .then(() => true)
        .catch(() => false);
    }
  }

  private async get<T>(url: string): Promise<T | null> {
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

  private async getArray<T>(url: string): Promise<T[]> {
    const result = await this.get<T>(url);

    return result? sortArrayByPos(Object.keys(result).map(key => ({ ...result[key], id: key })))
      : [];
  }

  private async add<T extends { id? }>(url: string, obj: T): Promise<T | null> {
    const databaseRef = push(this.getRefDatabase(url));

    const newObj: T = {
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

  private async remove(url: string, id: string): Promise<void> {
    await fbRemove(this.getRefDatabase(`${url}/${id}`))
  }

  private async update<T extends { id?: string }>(url: string, obj: T): Promise<void> {
    if ('id' in obj) {
      const id = obj.id;
      delete obj.id;

      await fbUpdate(this.getRefDatabase(`${url}/${id}`), obj);
    }
  }

  private getRefDatabase(url: string) {
    return refDatabase(this.database, url);
  }

  private getRefStorage(url: string) {
    return refStorage(this.storage, url);
  }
}

export { Firebase };
