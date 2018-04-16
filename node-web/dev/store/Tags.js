import { action, computed, observable, runInAction, useStrict } from 'mobx';

import { getTags } from '@/server/api';

export default class Tags {
    @observable tags = null;

    @action
    getTags = () => {
        return getTags().then(res => {
            if (res.code === 200) {
                this.tags = res.data;
            }
            return res;
        });
    };

}
