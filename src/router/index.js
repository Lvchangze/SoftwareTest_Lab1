import Vue from 'vue';
import Router from 'vue-router';
import Login from "../components/Login";
import Main from '../components/Main';
import ClerkPayBack from "../components/ClerkPayBack";
import AutoPayBack from '../components/AutoPayBack';
import TransactionInfo from "../components/TransactionInfo";
import FinancialProduct from "../components/FinancialProduct";
import AccountPage from "../components/AccountPage";
import LoanPage from "../components/LoanPage";
import BillPage from "../components/BillPage";
import AccountFinancialProduct from "../components/AccountFinancialProduct";

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/ClerkPayBack',
          name: 'ClerkPayBack',
          component: ClerkPayBack,
        },
        {
          path: '/AutoPayBack',
          name: 'AutoPayBack',
          component: AutoPayBack,
        },
        {
          path: '/TransactionInfo',
          name: 'TransactionInfo',
          component: TransactionInfo,
        },
        {
          path: '/FinancialProduct',
          name: 'FinancialProduct',
          component: FinancialProduct,
        },
        {
          path:'/AccountPage',
          name:'AccountPage',
          component: AccountPage,
        },
        {
          path: '/LoanPage',
          name: 'LoanPage',
          component: LoanPage,
        },
        {
          path: '/BillPage',
          name: 'BillPage',
          component: BillPage,
        },
        {
          path:'/AccountFinancialProduct',
          name:'AccountFinancialProduct',
          component:AccountFinancialProduct
        }
      ]
    },
  ]
})
