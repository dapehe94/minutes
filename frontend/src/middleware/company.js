import { store } from '@/store';

export default function company(to, from, next) {

    if ( store.state.auth.user.setting.selectedcompany === null ) {
        return next('/company/create');
    } else {
        return next();
    }

}