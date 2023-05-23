import { useQuery } from 'react-query';
import {
  admin_approved_tutoring_list,
  admin_waiting_tutoring_list,
  admin_waiting_weekly_list,
  all_student,
  get_made_tutoring,
  get_tutoring,
  my_weekly,
} from '../../api';

export const useAllStudent = () => {
  return useQuery('allStudent', async () => {
    const res = await all_student();
    return res.json();
  });
};

export const useWaitingTutoringList = () => {
  return useQuery('waitingTutoringList', async () => {
    const res = await admin_waiting_tutoring_list();
    return res.json();
  });
};

export const useApprovedTutoringList = () => {
  return useQuery('approvedTutoringList', async () => {
    const res = await admin_approved_tutoring_list();
    return res.json();
  });
};

export const useReportList = () => {
  return useQuery('reportList', async () => {
    const res = await admin_waiting_weekly_list();
    return res.json();
  });
};

export const useMadeTutoring = (id: string) => {
  return useQuery(['madeTutoring', id], async () => {
    const res = await get_made_tutoring(id);
    return res.json();
  });
};

export const useTutoring = (id: string, course_number: string) => {
  return useQuery(['tutoring', id, course_number], async () => {
    const res = await get_tutoring(id, course_number);
    return res.json();
  });
};

export const useMyWeeklyReport = (data: Object) => {
  return useQuery(['myWeeklyReport', data], async () => {
    const res = await my_weekly(data);
    return res.json();
  });
};
